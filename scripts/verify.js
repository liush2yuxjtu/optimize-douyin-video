import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
const client=new Client({name:'verify',version:'1.0.0'});
await client.connect(new StdioClientTransport({command:process.execPath,args:['src/mcp-server.js']}));
try{
 const list=await client.listTools();
 const names=list.tools.map(t=>t.name).sort().join(',');
 if(names!=='douyin_account_status,douyin_read_visible,douyin_status') throw Error(`Unexpected tools: ${names}`);
 console.log('PASS initialize/tools/list; three read-only tools');
 const status=await client.callTool({name:'douyin_status',arguments:{}});
 const statusData=JSON.parse(status.content?.[0]?.text??'{}');
 if(!statusData.open) throw Error('No open Douyin creator page');
 console.log(`PASS douyin_status; ${statusData.tabs.length} creator tab(s) open`);
 const account=await client.callTool({name:'douyin_account_status',arguments:{}});
 const accountData=JSON.parse(account.content?.[0]?.text??'{}');
 if(accountData.accountStatus!=='visible_account_detected') throw Error(`Account not detected: ${accountData.accountStatus}`);
 if(!accountData.account?.displayName||!accountData.account?.douyinId) throw Error('Account fields missing');
 console.log('PASS douyin_account_status; visible account identity detected');
 const visible=await client.callTool({name:'douyin_read_visible',arguments:{}});
 const visibleData=JSON.parse(visible.content?.[0]?.text??'{}');
 if(typeof visibleData.visibleText!=='string'||visibleData.visibleText.length===0) throw Error('Visible text missing');
 console.log(`PASS douyin_read_visible; ${visibleData.visibleText.length} visible characters`);
 let rejected=false;try{const r=await client.callTool({name:'douyin_publish_video',arguments:{}});rejected=!!r.isError}catch{rejected=true}
 if(!rejected)throw Error('Publish not rejected');
 console.log('PASS publish tool rejected');
}finally{await client.close()}
