from .app import db # Importa a instância do SQLAlchemy que será criada em app.py
import bcrypt # Importa a biblioteca bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Usaremos 'username' ou 'email' para login. Vamos usar 'username' para simplificar aqui.
    username = db.Column(db.String(80), unique=True, nullable=False)
    # Armazenaremos a senha HASHEADA, nunca a senha pura!
    password = db.Column(db.String(128), nullable=False)

    # Método para definir a senha (hasheando-a)
    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Método para verificar uma senha fornecida contra o hash armazenado
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

# Exemplo de como usar (isso não vai no arquivo models.py, é só para demonstração):
# from your_app_name.models import User # Assumindo que backend é um pacote chamado your_app_name
# from your_app_name.app import db # Importe db também

# # Criar um novo usuário
# new_user = User(username='teste')
# new_user.set_password('senha123')
# db.session.add(new_user)
# db.session.commit()

# # Encontrar um usuário
# user = User.query.filter_by(username='teste').first()

# # Verificar a senha
# if user and user.check_password('senha123'):
#     print("Senha correta!")
# else:
#     print("Senha incorreta!")