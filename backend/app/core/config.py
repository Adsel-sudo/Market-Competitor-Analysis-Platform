from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Internal Tools API"
    debug: bool = False

    DATABASE_URL: str | None = None
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgres"
    DB_NAME: str = "postgres"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL

        return (
            "postgresql+psycopg2://"
            f"{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()


_settings = get_settings()
print(f"DATABASE_URL raw: {_settings.DATABASE_URL}")
print(f"DATABASE_URL resolved: {_settings.database_url}")
