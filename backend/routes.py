# backend/routes.py
from flask import Blueprint, request, jsonify
from .app import db # Importa a instância do db do app
from .models import User # Importa o modelo User
import bcrypt # Importa bcrypt para check_password

# Cria um Blueprint para as rotas da API
# Isso ajuda a organizar rotas em projetos maiores
api_bp = Blueprint('api', __name__) # <<< ESTA LINHA DEFINE O 'api_bp'

@api_bp.route('/login', methods=['POST'])
def login():
    # Certifica-se de que a requisição tem o cabeçalho Content-Type: application/json
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    # Pega os dados JSON enviados pelo frontend
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Verifica se 'username' e 'password' foram fornecidos
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    # Busca o usuário no banco de dados pelo username
    # Use .first() pois esperamos apenas um resultado único
    user = User.query.filter_by(username=username).first()

    # Verifica se o usuário existe E se a senha está correta
    if user and user.check_password(password): # check_password usa bcrypt internamente
        # Se login bem-sucedido
        # Em uma aplicação real, você geraria um token JWT ou criaria uma sessão aqui
        return jsonify({"status": "success", "message": "Login bem-sucedido!"}), 200
    else:
        # Se usuário não encontrado ou senha incorreta
        return jsonify({"status": "error", "message": "Usuário ou senha inválidos."}), 401 # 401 Unauthorized

# Você adicionará outras rotas da API neste arquivo futuramente
# @api_bp.route('/register', methods=['POST'])
# def register():
#    pass # Implementação do registro...