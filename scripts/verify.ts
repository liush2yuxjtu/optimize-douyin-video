import {createRequire} from 'node:module';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';

type StatusPayload = {
  open?: boolean;
  tabs?: unknown[];
};

type AccountPayload = {
  accountStatus?: string;
  account?: {
    displayName?: string | null;
    douyinId?: string | null;
  };
};

type VisiblePayload = {
  visibleText?: string;
};

const require = createRequire(import.meta.url);
const tsxLoader = require.resolve('tsx');

function toolText(result: Awaited<ReturnType<Client['callTool']>>): string {
  if (!('content' in result) || !Array.isArray(result.content)) return '{}';
  const first = result.content[0];
  return first?.type === 'text' ? first.text : '{}';
}

const client = new Client({name: 'verify', version: '1.0.0'});
await client.connect(
  new StdioClientTransport({
    command: process.execPath,
    args: ['--import', tsxLoader, 'src/mcp-server.ts'],
  }),
);
try {
  const list = await client.listTools();
  const names = list.tools
    .map((tool) => tool.name)
    .sort()
    .join(',');
  if (names !== 'douyin_account_status,douyin_read_visible,douyin_status') {
    throw Error(`Unexpected tools: ${names}`);
  }
  console.log('PASS initialize/tools/list; three read-only tools');
  const status = await client.callTool({name: 'douyin_status', arguments: {}});
  const statusData = JSON.parse(toolText(status)) as StatusPayload;
  if (!statusData.open) throw Error('No open Douyin creator page');
  console.log(`PASS douyin_status; ${statusData.tabs?.length ?? 0} creator tab(s) open`);
  const account = await client.callTool({name: 'douyin_account_status', arguments: {}});
  const accountData = JSON.parse(toolText(account)) as AccountPayload;
  if (accountData.accountStatus !== 'visible_account_detected') {
    throw Error(`Account not detected: ${accountData.accountStatus}`);
  }
  if (!accountData.account?.displayName || !accountData.account?.douyinId) {
    throw Error('Account fields missing');
  }
  console.log('PASS douyin_account_status; visible account identity detected');
  const visible = await client.callTool({name: 'douyin_read_visible', arguments: {}});
  const visibleData = JSON.parse(toolText(visible)) as VisiblePayload;
  if (typeof visibleData.visibleText !== 'string' || visibleData.visibleText.length === 0) {
    throw Error('Visible text missing');
  }
  console.log(`PASS douyin_read_visible; ${visibleData.visibleText.length} visible characters`);
  let rejected = false;
  try {
    const publish = await client.callTool({name: 'douyin_publish_video', arguments: {}});
    rejected = Boolean(publish.isError);
  } catch {
    rejected = true;
  }
  if (!rejected) throw Error('Publish not rejected');
  console.log('PASS publish tool rejected');
} finally {
  await client.close();
}
