# OpenTelemetry HTTP and HTTPS Instrumentation for Node.js

[![NPM Published Version][npm-img]][npm-url]
[![Apache License][license-image]][license-image]

**Note: This is an experimental package under active development. New releases may include breaking changes.**

This module provides automatic instrumentation for [`http`](https://nodejs.org/api/http.html) and [`https`](https://nodejs.org/api/https.html).

For automatic instrumentation see the
[@opentelemetry/sdk-trace-node](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-sdk-trace-node) package.

## Installation

```bash
npm install --save @opentelemetry/instrumentation-http
```

## Supported Versions

- Nodejs `>=14`

## Usage

OpenTelemetry HTTP Instrumentation allows the user to automatically collect telemetry and export it to their backend of choice, to give observability to distributed systems.

To load a specific instrumentation (HTTP in this case), specify it in the Node Tracer's configuration.

```js
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const provider = new NodeTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())]
});

provider.register();

registerInstrumentations({
  instrumentations: [new HttpInstrumentation()],
});

```

See [examples/http](https://github.com/open-telemetry/opentelemetry-js/tree/main/examples/http) for a short example.

### Http instrumentation Options

Http instrumentation has few options available to choose from. You can set the following:

| Options | Type | Description |
| ------- | ---- | ----------- |
| [`applyCustomAttributesOnSpan`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#L91) | `HttpCustomAttributeFunction` | Function for adding custom attributes |
| [`requestHook`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#93) | `HttpRequestCustomAttributeFunction` | Function for adding custom attributes before request is handled |
| [`responseHook`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#L95) | `HttpResponseCustomAttributeFunction` | Function for adding custom attributes before response is handled |
| [`startIncomingSpanHook`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#L97) | `StartIncomingSpanCustomAttributeFunction` | Function for adding custom attributes before a span is started in incomingRequest |
| [`startOutgoingSpanHook`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#L99) | `StartOutgoingSpanCustomAttributeFunction` | Function for adding custom attributes before a span is started in outgoingRequest |
| `ignoreIncomingRequestHook` | `IgnoreIncomingRequestFunction` | Http instrumentation will not trace all incoming requests that matched with custom function |
| `ignoreOutgoingRequestHook` | `IgnoreOutgoingRequestFunction` | Http instrumentation will not trace all outgoing requests that matched with custom function |
| `disableOutgoingRequestInstrumentation` | `boolean` | Set to true to avoid instrumenting outgoing requests at all. This can be helpful when another instrumentation handles outgoing requests. |
| `disableIncomingRequestInstrumentation` | `boolean` | Set to true to avoid instrumenting incoming requests at all. This can be helpful when another instrumentation handles incoming requests. |
| [`requireParentforOutgoingSpans`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#L103) | Boolean | Require that is a parent span to create new span for outgoing requests. |
| [`requireParentforIncomingSpans`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#L105) | Boolean | Require that is a parent span to create new span for incoming requests. |
| [`headersToSpanAttributes`](https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/types.ts#L107) | `object` | List of case insensitive HTTP headers to convert to span attributes. Client (outgoing requests, incoming responses) and server (incoming requests, outgoing responses) headers will be converted to span attributes in the form of `http.{request\|response}.header.header_name`, e.g. `http.response.header.content_length` |

## Semantic Conventions

This package emits Semantic Convention [Version 1.27.0](https://github.com/open-telemetry/semantic-conventions/blob/v1.27.0/docs/http/http-spans.md).

Follow all requirements and recommendations of HTTP Client and Server Semantic Conventions Version 1.27.0 for [spans](https://github.com/open-telemetry/semantic-conventions/blob/v1.27.0/docs/http/http-spans.md) and [metrics](https://github.com/open-telemetry/semantic-conventions/blob/v1.27.0/docs/http/http-metrics.md), including all required and recommended attributes.

Metrics Exported:

- [`http.server.request.duration`](https://github.com/open-telemetry/semantic-conventions/blob/v1.27.0/docs/http/http-metrics.md#metric-httpserverrequestduration)
- [`http.client.request.duration`](https://github.com/open-telemetry/semantic-conventions/blob/v1.27.0/docs/http/http-metrics.md#metric-httpclientrequestduration)

## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more about OpenTelemetry JavaScript: <https://github.com/open-telemetry/opentelemetry-js>
- For help or feedback on this project, join us in [GitHub Discussions][discussions-url]

## License

Apache 2.0 - See [LICENSE][license-url] for more information.

[discussions-url]: https://github.com/open-telemetry/opentelemetry-js/discussions
[license-url]: https://github.com/open-telemetry/opentelemetry-js/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/license-Apache_2.0-green.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@opentelemetry/instrumentation-http
[npm-img]: https://badge.fury.io/js/%40opentelemetry%2Finstrumentation-http.svg
