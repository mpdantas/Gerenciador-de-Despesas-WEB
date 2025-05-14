from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # Importa a extensão CORS
from .config import Config # Importa a classe Config

# Inicializa a extensão SQLAlchemy SEM configurar o app ainda
# Isso permite importar 'db' em models.py antes de criar o app
db = SQLAlchemy()

# Define uma função para criar o aplicativo (padrão de fábrica de aplicativos)
# Isso facilita testes e diferentes configurações (dev, prod)
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Inicializa o SQLAlchemy com o app configurado
    db.init_app(app)

    # Habilita CORS para todas as rotas (para desenvolvimento)
    # Em produção, você pode querer restringir as origens
    CORS(app)

    # Importa e registra as rotas
    from .routes import api_bp # Assumindo que routes.py usa um Blueprint
    app.register_blueprint(api_bp, url_prefix='/api') # Prefixo /api para todas as rotas

    # Cria as tabelas do banco de dados se não existirem
    # Importe os modelos antes de chamar create_all()
    with app.app_context():
         from .models import User # Importa seus modelos aqui
         db.create_all() # Cria as tabelas no banco de dados (site.db)

    return app

# Ao executar este arquivo diretamente (ex: python app.py), ele cria e roda o app
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) # debug=True é ótimo para desenvolvimento (recarrega automático, etc.)