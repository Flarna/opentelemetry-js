/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type * as http from 'http';
import type * as https from 'https';
import { ExportResponse } from '../export-response';

export type sendWithHttp = (
  params: HttpRequestParameters,
  agent: http.Agent | https.Agent,
  data: Uint8Array,
  onDone: (response: ExportResponse) => void,
  timeoutMillis: number
) => void;

export interface HttpRequestParameters {
  url: string;
  headers: () => Record<string, string>;
  compression: 'gzip' | 'none';
  agentOptions: http.AgentOptions | https.AgentOptions;
}
