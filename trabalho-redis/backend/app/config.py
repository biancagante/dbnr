import redis 
from dotenv import load_dotenv
import os

load_dotenv()

#  CLOUD ENV - Funciona, só tire o comentário abaixo e deixe o próximo redis_cliente comentado (apenas se tiver o env com cloud)
redis_cliente = redis.Redis(
    host = os.getenv("CLOUD_REDIS_HOST"),
    port = os.getenv("CLOUD_REDIS_PORT"),
    db = os.getenv("CLOUD_REDIS_DB", 0),
    password = os.getenv("CLOUD_REDIS_PASSWORD", None),
    username = os.getenv("CLOUD_REDIS_USERNAME"), 
    decode_responses = True
)

# redis_cliente = redis.Redis(
#     host = os.getenv("REDIS_HOST"),
#     port = os.getenv("REDIS_PORT"),
#     db = os.getenv("REDIS_DB", 0),
#     password = os.getenv("REDIS_PASSWORD", None),
#     decode_responses = True
# )

if redis_cliente.ping:
    print("Conectado localmente na porta:", redis_cliente.connection_pool.connection_kwargs.get('port'))
else: 
    print("Não foi possível conectar localmente.")
