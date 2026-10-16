import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverPath = path.join(rootDir, 'src', 'mcp-server.ts');
type ToolCallOutcome = Awaited<ReturnType<Client['callTool']>>;

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
  visibleText?: unknown;
};

function firstText(result: ToolCallOutcome): string {
  if (!('content' in result) || !Array.isArray(result.content)) return '{}';
  const first = result.content[0];
  return first?.type === 'text' ? first.text : '{}';
}

const client = new Client({name: 'verify', version: '1.0.0'});
await client.connect(new StdioClientTransport({
  command: process.execPath,
  args: ['--import', 'tsx', serverPath],
  cwd: rootDir,
}));
try {
  const list = await client.listTools();
  const names = list.tools.map(t => t.name).sort().join(',');
  if (names !== 'douyin_account_status,douyin_read_visible,douyin_status') throw Error(`Unexpected tools: ${names}`);
  console.log('PASS initialize/tools/list; three read-only tools');
  const status = await client.callTool({name: 'douyin_status', arguments: {}});
  const statusData = JSON.parse(firstText(status)) as StatusPayload;
  if (!statusData.open) throw Error('No open Douyin creator page');
  console.log(`PASS douyin_status; ${statusData.tabs!.length} creator tab(s) open`);
  const account = await client.callTool({name: 'douyin_account_status', arguments: {}});
  const accountData = JSON.parse(firstText(account)) as AccountPayload;
  if (accountData.accountStatus !== 'visible_account_detected') throw Error(`Account not detected: ${accountData.accountStatus}`);
  if (!accountData.account?.displayName || !accountData.account?.douyinId) throw Error('Account fields missing');
  console.log('PASS douyin_account_status; visible account identity detected');
  const visible = await client.callTool({name: 'douyin_read_visible', arguments: {}});
  const visibleData = JSON.parse(firstText(visible)) as VisiblePayload;
  if (typeof visibleData.visibleText !== 'string' || visibleData.visibleText.length === 0) throw Error('Visible text missing');
  console.log(`PASS douyin_read_visible; ${visibleData.visibleText.length} visible characters`);
  let rejected = false;
  try {
    const r = await client.callTool({name: 'douyin_publish_video', arguments: {}});
    rejected = !!r.isError;
  } catch {
    rejected = true;
  }
  if (!rejected) throw Error('Publish not rejected');
  console.log('PASS publish tool rejected');
} finally {
  await client.close();
}
