import {Server} from '@modelcontextprotocol/sdk/server/index.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {ListToolsRequestSchema,CallToolRequestSchema} from '@modelcontextprotocol/sdk/types.js';
import puppeteer from 'puppeteer-core';
const names=['douyin_status','douyin_read_visible'];
const server=new Server({name:'douyin-readonly',version:'0.1.0'},{capabilities:{tools:{}}});
server.setRequestHandler(ListToolsRequestSchema,async()=>({tools:names.map(name=>({name,description:name==='douyin_status'?'Inspect open Douyin tabs; does not prove login.':'Read visible text of the open Douyin creator page. No navigation or clicks.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,destructiveHint:false}}))}));
server.setRequestHandler(CallToolRequestSchema,async({params})=>{
 if(!names.includes(params.name)) throw new Error('Tool not allowed');
 if(Object.keys(params.arguments??{}).length) throw new Error('No arguments accepted');
 const browser=await puppeteer.connect({browserURL:'http://127.0.0.1:9335'});
 try{
 const pages=(await browser.pages()).filter(p=>{try{return new URL(p.url()).origin==='https://creator.douyin.com'}catch{return false}});
 let result={open:pages.length>0,login:'unverified',tabs:await Promise.all(pages.map(async p=>({title:await p.title(),url:new URL(p.url()).origin+new URL(p.url()).pathname})))};
 if(params.name==='douyin_read_visible'&&pages.length) result.visibleText=(await pages[0].evaluate(()=>document.body.innerText)).slice(0,16000);
 return {content:[{type:'text',text:JSON.stringify(result)}]};
 }finally{await browser.disconnect()}
});
await server.connect(new StdioServerTransport());
