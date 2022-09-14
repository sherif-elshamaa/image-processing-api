# image-processing-api
This project is real world example for image resizing API using nodeJs

How to build and start the server
The project can be built and run in the following ways

1. Install all dependencies
{npm i}

2. Build
{npm run build}

3. Start the Server
{npm start}

4. Linting
{npm run lint}

5. Testing
{npm run test}

Endpoint-1
/api/preview/?filename=<image_name>
to preview original images, query requird filename

Endpoint-2
/api/convert?width=<width>&height=<height>&filename=<image_name>
to resize the imgae and show it, query required filename, width, and height

Built With
NodeJS - The JavaScript runtime.
Express - The web framework.
TypeScript - The language used.
Jasmine - Test unit 
Sharp - NodeJS image processor.
