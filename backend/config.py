import os

class Config:
    # Chave secreta para segurança (geralmente usada para sessões, etc.)
    # Mude isso para um valor aleatório e complexo em produção!
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'sua_chave_secreta_muito_segura_e_dificil'

    # Configuração do banco de dados SQLite
    # A URI 'sqlite:///site.db' cria um arquivo chamado 'site.db'
    # no diretório onde o app.py está sendo executado.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///site.db'

    # Desabilita o rastreamento de modificações do SQLAlchemy (opcional, pode liberar recursos)
    SQLALCHEMY_TRACK_MODIFICATIONS = False