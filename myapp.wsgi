import sys
activate_this = '/home/mako/pythonProjects/restProject/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))
sys.path.append('/home/mako/pythonProjects/restProject')
 
from routes import app as application