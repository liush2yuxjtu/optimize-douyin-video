import {Server} from '@modelcontextprotocol/sdk/server/index.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {CallToolRequestSchema,ListToolsRequestSchema} from '@modelcontextprotocol/sdk/types.js';
import puppeteer from 'puppeteer-core';

const CREATOR_ORIGIN='https://creator.douyin.com';
const CDP_URL='http://127.0.0.1:9335';
const SERVER_VERSION='0.2.0';

const tools=[
 {name:'douyin_status',description:'Inspect open Douyin creator tabs; does not prove login or account ownership.'},
 {name:'douyin_account_status',description:'Read the visible account name and Douyin ID from the open creator page. This is a visible-page check, not a cookie or token check.'},
 {name:'douyin_read_visible',description:'Read visible text from the open Douyin creator page. No navigation or clicks.'}
].map(tool=>({
 ...tool,
 inputSchema:{type:'object',properties:{},additionalProperties:false},
 annotations:{readOnlyHint:true,destructiveHint:false}
}));

function creatorPages(browser){
 return browser.pages().then(pages=>pages.filter(page=>{
  try{return new URL(page.url()).origin===CREATOR_ORIGIN}catch{return false}
 }));
}

function pageSummary(page){
 return Promise.all([page.title(),Promise.resolve(new URL(page.url()).pathname)]).then(([title,path])=>({title,url:CREATOR_ORIGIN+path}));
}

function parseVisibleAccount(visibleText){
 const lines=visibleText.split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
 const idIndex=lines.findIndex(line=>/^抖音号\s*[:：]?\s*[A-Za-z0-9._-]+$/.test(line));
 if(idIndex<0)return {displayName:null,douyinId:null};
 const match=lines[idIndex].match(/^抖音号\s*[:：]?\s*([A-Za-z0-9._-]+)$/);
 return {displayName:idIndex>0?lines[idIndex-1]:null,douyinId:match?.[1]??null};
}

async function inspect(){
 const browser=await puppeteer.connect({browserURL:CDP_URL});
 try{
  const pages=await creatorPages(browser);
  const tabs=await Promise.all(pages.map(pageSummary));
  return {browser,pages,tabs};
 }catch(error){
  await browser.disconnect();
  throw error;
 }
}

const server=new Server({name:'douyin-readonly',version:SERVER_VERSION},{capabilities:{tools:{}}});
server.setRequestHandler(ListToolsRequestSchema,async()=>({tools}));
server.setRequestHandler(CallToolRequestSchema,async({params})=>{
 if(!tools.some(tool=>tool.name===params.name))throw new Error('Tool not allowed');
 if(Object.keys(params.arguments??{}).length)throw new Error('No arguments accepted');
 const {browser,pages,tabs}=await inspect();
 try{
  const result={open:pages.length>0,login:'unverified',tabs};
  if(params.name==='douyin_read_visible'&&pages.length){
   result.visibleText=(await pages[0].evaluate(()=>document.body.innerText)).slice(0,16000);
  }
  if(params.name==='douyin_account_status'){
   if(!pages.length){
    result.accountStatus='no_creator_page';
    result.account={displayName:null,douyinId:null};
   }else{
    const visibleText=await pages[0].evaluate(()=>document.body.innerText);
    const account=parseVisibleAccount(visibleText);
    result.accountStatus=account.displayName||account.douyinId?'visible_account_detected':'visible_account_not_detected';
    result.account=account;
    result.source='visible_page_text';
    result.visibleTextLength=visibleText.length;
   }
  }
  return {content:[{type:'text',text:JSON.stringify(result)}]};
 }finally{await browser.disconnect()}
});
await server.connect(new StdioServerTransport());
