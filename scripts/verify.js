import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
const client=new Client({name:'verify',version:'1.0.0'});
await client.connect(new StdioClientTransport({command:process.execPath,args:['src/mcp-server.js']}));
try{
 const list=await client.listTools();
 if(list.tools.map(t=>t.name).sort().join(',')!=='douyin_read_visible,douyin_status') throw Error('Unexpected tools');
 console.log('PASS initialize/tools/list; only two read-only tools');
 console.log(JSON.stringify(await client.callTool({name:'douyin_status',arguments:{}})));
 let rejected=false;try{const r=await client.callTool({name:'douyin_publish_video',arguments:{}});rejected=!!r.isError}catch{rejected=true}
 if(!rejected)throw Error('Publish not rejected');
 console.log('PASS publish tool rejected');
}finally{await client.close()}
