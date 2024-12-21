# Happy Farmers Market
## Backend REST API

## How To Run

### PostgreSQL Installation
In order to run this application, you will need to have PostgreSQL running on your machine. 
We recommend you use the [official Docker image](https://hub.docker.com/_/postgres/), however [other installation methods](https://www.postgresql.org/download/) work as well.

### Modifying Configuration Files
After PostgreSQL is installed and running on your machine, set the following properties in the [`application.yml`](https://github.com/241209-JavaReactAWS/olga-nathanael-project1/blob/main/backend/src/main/resources/application.yml) file:
- `spring.datasource.url`: The JDBC URL for connecting to your database, including the database name, using the following format: `jdbc:postgresql://<hostname>:<port>/<database_name>`
- `spring.datasource.username`: The username to be used to connect to your databse.
- `spring.datasource.password`: The password to be used to connect to your database.

### Running on Linux / MacOS
In the project directory, run `./mvnw spring-boot:run`.

### Running on Windows
In the project directory, run `./mvnw.cmd spring-boot:run`.
