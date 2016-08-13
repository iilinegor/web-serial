# web-serial
Serial port web interface
<h2>Install</h2>
<p>Firstly install <a href="https://nodejs.org/en/">Node.js</a></p>
<p>Next install dependencies</p>
<p><code>cd web-serial</code></p>
<p><code>npm install</code></p>
<p><code>npm install -g http-server</code></p>

<h2>Run</h2>
<p>In the first place run working with serial port server </p>
`npm run server <serialPort>`

<p>Further start up web interface server</p>
`http-server ./pub/ -p 80`

<p>Well done! Now that works in <a href="http://localhost/">localhost</a></p>

<img src="https://habrastorage.org/files/bc2/6e3/f39/bc26e3f3953944cda06d6b5d9dc2d236.png"/>
