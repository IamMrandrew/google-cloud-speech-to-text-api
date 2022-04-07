# Google Cloud Speech-to-text API

An example of server an API with Express, using the Google Cloud Speech-to-text API to transcribe audio.

You can test the API with [Postman](https://www.postman.com), and call the API with `form-data` body and the following params.

## API Reference

### `POST` `/api/sts`

#### Request Params

- `audio`: An audio file with `wav/linear` format, and the sample rate is `44100`.

#### Response

- `transcription`: Text transcription
- `confidence`: Confidence score

## Getting Started

First, to install the dependices run:

```bash
yarn install
```

Then, export the credentials for the Google Cloud Platform on CLI:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=<path to the json file>
```

Then, build and run the server:

```bash
yarn build
yarn start
```

## Configuration

Create a file called .env on the root directory and add the following to change the port and sample rate.

```bash
PORT=<port>
SAMPLE_RATE=<sample rate>
```
