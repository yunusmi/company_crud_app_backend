<p>Документация <b>на русском</b> доступна <a href="https://github.com/yunusmi/company_crud_app_backend/blob/master/README_RU.md">здесь</a></p>

<h1>BackEnd server for company data management</h1>

<p>This application is a backend server for managing company data such as employees, sales, products, branches, and inventory. The frontend part is available <a href="https://github.com/yunusmi/company_crud_app_front_end/blob/master/README.md">here</a>.</p>

<h2>Technologies Used:</h2>
<ul>
  <li><strong>NodeJS</strong></li>
  <li><strong>Express</strong> framework</li>
  <li><strong>TypeScript</strong></li>
  <li><strong>ORM</strong>: Sequelize</li>
  <li><strong>Database</strong>: MySQL</li>
  <li><strong>Caching system</strong>: Redis</li>
  <li><strong>API Documentation</strong>: Swagger (available in the development environment at URI: /api-docs/v1)</li>
</ul>

<p>The client and server communicate via the HTTP protocol using REST API architectural style in JSON format.</p>

<h2>Setup</h2>

<p><strong>Prerequisites:</strong></p>
<ul>
  <li>MySQL database version 5.7 or higher</li>
  <li>NodeJS version 17.0 or higher</li>
  <li>Docker and Docker Compose</li>
  <li>Stable internet connection (required for downloading necessary dependencies)</li>
</ul>

<ol>
  <li>To start the setup, create a project folder and clone the remote project repository:
    <pre><code>git clone https://github.com/yunusmi/company_crud_app_backend.git .</code></pre>
    </li>
  <li>Next, install the project dependencies with the command: 
  <pre><code>npm install</code></pre>
  </li>
  <li>After installing the dependencies, create a MySQL database for the application, which is then specified in the project configuration file.</li>
  <li>After creating the database, create a <b>.env</b> configuration file based on the <b>.env.example</b> template and insert the necessary data for the application.</li>
</ol>

<h3>Parameter Description:</h3>
<ul>
  <li><strong>APP_PORT</strong> - specifies the NodeJS application port (default is port 3000)</li>
  <li><strong>APP_HOST</strong> - NodeJS application host (default is localhost)</li>

  <li><strong>DB_DEV_HOST</strong> - database host for the development mode (if the database is installed locally, leave it as 127.0.0.1)</li>
  <li><strong>DB_DEV_USERNAME</strong> - database username for development mode (dev)</li>
  <li><strong>DB_DEV_PASSWORD</strong> - database password for development mode (dev)</li>
  <li><strong>DB_DEV_NAME</strong> - database name for development mode (dev)</li>
  <li><strong>DB_DEV_DIALECT</strong> - database type (default is mysql)</li>

  <li><strong>DB_PROD_HOST</strong> - database host for running the application in production</li>
  <li><strong>DB_PROD_USERNAME</strong> - database username for running the application in production</li>
  <li><strong>DB_PROD_PASSWORD</strong> - database password for running the application in production</li>
  <li><strong>DB_PROD_NAME</strong> - database name for running the application in production</li>
  <li><strong>DB_PROD_DIALECT</strong> - database type (default is mysql)</li>

  <li><strong>REDIS_HOST</strong> - Redis host (default is localhost)</li>
  <li><strong>REDIS_PORT</strong> - Redis port (default is 6379)</li>
  <li><strong>REDIS_DB</strong> - Redis database number (default is 0)</li>
  <li><strong>REDIS_EXPIRE_TIME</strong> - Redis key expiration time (in seconds, default is 50)</li>
</ul>

<p><b>Note:</b> The environment can be either development (for development purposes) or production (on a remote server). For each of them, you need to specify a separate database. Before deploying the application on a production server, it is recommended to test and run the application in development mode (on a local PC), and only then deploy the application on a real production server.</p>

<h2>Database Table Migration and Initial Data Seeding</h2>

<p>To create the necessary tables for the application, you need to perform a table migration and then seed them with initial data.</p>

<p>Run the command:</p>

<pre><code>npm run db:migrate:up:development</code></pre>

<p>The system will automatically create the necessary tables for the application using the database configuration data.</p>

<p>After the tables are created, they need to be seeded with initial data.</p>

<p>To do this, use the command:</p>

<pre><code>npm run db:seed:all:development</code></pre>

<p>The system will automatically insert the initial data and populate the application's database tables.</p>

<h2>Running the Application</h2>

<p>To run the application on a local server (development), follow these steps:</p>
<ol>
  <li>Start the Redis container via Docker with the command:
    <pre><code>docker run --name redis -d -p 6379:6379 redis</code></pre>
  </li>
  <li>Start the application:
    <pre><code>npm run start:development</code></pre>
  </li>
</ol>

<p>Now you can run the FrontEnd client, remembering to specify the address and port of the Backend application in the client configuration file (before compilation, the <b>config.js</b> file).</p>

<p>This completes the setup and running of the application in the local (development) environment. You can modify and enhance the application's functionality. The following instructions are for setting up the application on a production server (e.g., if you have updated the application's functionality and want to deploy it on a remote server).</p>

<h2>Setting Up the Application on a Production Server</h2>

<p>First, create a project folder and upload the project files to the remote server using FTP or git (use the command on the remote server: <code>git clone https://github.com/yunusmi/company_crud_app_backend.git .</code>)</p>

<p>Create a <b>.env</b> file based on the <b>.env.example</b> template and fill in the parameters for the production environment.</p>

<p>Next, create a Docker image for the application with the command:</p>

<pre><code>docker-compose build</code></pre>

<p>This will start the image build process, during which all Node.js dependencies will be installed, and tables will be initialized from the migration files <b>(see the migrations folder),</b> and initial data will be seeded into these tables as specified in the seeders folder.</p>

<p>After the image is built, you can run a container based on this image:</p>

<pre><code>docker-compose up -d</code></pre>

<p>which will start the container in the background.</p>

<p>The application is now available remotely.</p>

<p>To view logs and debug errors, use the command:</p>

<pre><code>docker logs company_data_management_app</code></pre>

<p>To stop the application, use the command:</p>

<pre><code>docker-compose down</code></pre>

<p>Additionally, you can set up a domain, change the application port, and configure HTTPS for secure communication between the client application and the remote server.</p>

<p>Also, remember to update the client's configuration with the new server details (address, protocol, and port).</p>

<h2>Conclusion</h2>

<p>This project is distributed under the MIT license. You can use all the code from this project in your projects absolutely free.</p>

<p>If you need my help or consultation, you can contact me by email: <a href="mailto:contact@yunus-mil.ru">contact@yunus-mil.ru</a>.</p>
