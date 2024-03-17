<h1>BackEnd server for company data management</h1>

<p>This application is a BackEnd server for managing company data such as employees, sales, products, branches, and inventory. The FrontEnd part is available <a href="https://github.com/yunusmi/company_crud_app_front_end/blob/master/README.md">here</a>.</p>

<h2>Technologies Used:</h2>
<ul>
  <li><strong>NodeJS</strong></li>
  <li><strong>Express</strong> framework</li>
  <li><strong>TypeScript</strong></li>
  <li><strong>ORM</strong>: Sequelize</li>
  <li><strong>Database</strong>: MySQL</li>
  <li><strong>API Documentation</strong>: Swagger (available at URI: /api-docs/v1)</li>
</ul>

<p>The client and server communicate with each other via the HTTP protocol, using the REST API architectural style in JSON format.</p>

<h2>Setup</h2>

<p><strong>Prerequisites:</strong></p>
<ul>
  <li>Installed MySQL database version 5.7 or higher</li>
  <li>Installed NodeJS version 17.0 or higher</li>
  <li>Stable internet connection (required for fetching necessary client dependencies)</li>
</ul>

<ol>
  <li>To start the setup, create a project folder and then clone the remote project repository:
    <pre><code>git clone https://github.com/yunusmi/company_crud_app_backend.git .</code></pre>
    </li>
  <li>Then, install project dependencies using the command: 
  <pre><code>npm install</code></pre>
  </li>
  <li>After installing dependencies, create a MySQL database for the application, which is then specified in the project configuration file.</li>
  <li>After creating the database, create a configuration file <b>.env</b> following the example of <b>.env.example</b> and fill in the data for the application to work.</li>
</ol>

<h3>Description of parameters:</h3>
<ul>
  <li><strong>APP_PORT</strong> - Specifies the NodeJS application port (default port is 3000)</li>
  <li><strong>APP_HOST</strong> - NodeJS application host (default is localhost)</li>

  <li><strong>DB_DEV_HOST</strong> - Database host for development mode (if the database is installed locally, leave it as 127.0.0.1)</li>
  <li><strong>DB_DEV_USERNAME</strong> - Database username for development mode (dev)</li>
  <li><strong>DB_DEV_PASSWORD</strong> - Database user password for development mode (dev)</li>
  <li><strong>DB_DEV_NAME</strong> - Database name for development mode (dev)</li>
  <li><strong>DB_DEV_DIALECT</strong> - Database type (default is mysql)</li>

  <li><strong>DB_PROD_HOST</strong> - Database host for running the application in production</li>
  <li><strong>DB_PROD_USERNAME</strong> - Database username for running the application in production</li>
  <li><strong>DB_PROD_PASSWORD</strong> - Database user password for running the application in production</li>
  <li><strong>DB_PROD_NAME</strong> - Database name for running the application in production</li>
  <li><strong>DB_PROD_DIALECT</strong> - Database type (default is mysql)</li>
</ul>

<p><b>Explanation:</b> The runtime environment can be either development (development mode) or production (on a remote server), and for each of them, you need to specify your own database. However, before deploying the application to a production server, it is recommended to test and run the application in development mode (working on a local PC), and only then deploy the application to a real production server.</p>

<h2>Database Table migration and initial data population</h2>

<p>To create tables for the application to work, you need to migrate the tables, and then populate them with initial data.</p>

<p>Run the command:</p>

<pre><code>npm run db:migrate:up:development</code></pre>

<p>to create application tables for the development environment. The system will automatically create the necessary tables for the application, using the database configuration data.</p>

<p>If the application is being set up on a remote server (in production environment), then run this command:</p>

<pre><code>npm run db:migrate:up:production</code></pre>

<p>The system will automatically create the necessary tables for the application, using the database configuration data for the production server.</p>

<p>After creating the tables, you need to populate them with initial data.</p>

<p>For development, use the command:</p>

<pre><code>npm run db:seed:all:development</code></pre>

<p>For production, use the command:</p>

<pre><code>npm run db:seed:all:production</code></pre>

<p>The system will automatically insert initial data and populate the tables in the application database.</p>

<h2>Startup</h2>

<p>To start on a local server (development), enter the command:</p>

<pre><code>npm run start:development</code></pre>

<p>Now you can start the FrontEnd client, before that don't forget to specify the address and port of the BackEnd application in the client configuration file (before compilation, file <b>config.js</b>).</p>

<p>This concludes the setup for running the application in the local (development) environment. You can modify and enhance the functionality of the application. Further instructions are for setting up on a production server (suppose you have updated the functionality of the application and want to run the application on a remote server).</p>

<h2>Setting up the Application on a remote server in production mode</h2>

<p>First, create a folder for the project and transfer the files of your local project to the remote server using FTP or git (use the command on the remote server: <code>git clone [remote repository].git</code>).</p>

<p>Repeat the commands with installing dependencies, configuring the database, migrating tables, and populating them with initial data on remote server.</p>

<p>Then you need to compile the project (since the application was written in TypeScript, it needs to be compiled into JavaScript). To do this, use the command:</p>

<pre><code>npm run compile-project</code></pre>

<p>which will create a <b>dist</b> folder containing the compiled JavaScript application.</p>

<p>Next, run the command:</p>

<pre><code>npm run start:production</code></pre>

<p>which will start the application in the background.</p>

<p>Now the application is available remotely.</p>

<p>To view logs and debug errors, use the command:</p>

<pre><code>npm run log</code></pre>

<p>To stop the application, use the command:</p>

<pre><code>npm run stop:production</code></pre>

<p>Additionally, you can configure the domain, change the application port, and also set up HTTPS for secure connection between the client application and the remote server.</p>

<p>Also, don't forget to update the client configuration to the new server data (address, protocol, and port).</p>

<h2>Conclusion</h2>

<p>This project is distributed under the MIT license. You can use all the code of this project in your projects absolutely for free.</p>

<p>If you need my help or consultation, you can contact me by email: <a href="mailto:contact@yunus-mil.ru">contact@yunus-mil.ru</a>.</p>
