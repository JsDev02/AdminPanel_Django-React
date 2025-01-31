from frontinfo.models import FrontInfo
from users.models import User

# Cargar FrontInfo
front_info = FrontInfo(
    title="Bienvenido a la aplicación",
    description=("Lorem ipsum odor amet, consectetuer adipiscing elit. "
                 "Natoque sapien amet; metus netus dignissim habitant. "
                 "Per platea class leo dolor aliquam parturient. "
                 "Ligula facilisis fames nec sagittis rutrum turpis. "
                 "Eleifend nascetur blandit vel vel efficitur senectus taciti iaculis. "
                 "Lobortis mus dapibus natoque dui volutpat a nisi habitant. "
                 "Orci vivamus nec tortor est arcu tempor lacus. "
                 "Inceptos ornare gravida nibh rhoncus est. "
                 "Montes adipiscing pulvinar justo consequat habitant suspendisse? "
                 "Porta primis tortor sociosqu aliquet ac ultricies."),
    image="/src/assets/react.svg"
)
front_info.save()

# Cargar usuarios
users_data = [
    ('Panzofi', 'admin', 1, 'admin123'),
    ('GreenWave Innovations', 'user1', 0, 'password1'),
    ('BrightFuture Enterprises', 'user2', 0, 'password2'),
    ('Streamline Systems', 'user3', 0, 'password3'),
    ('Peak Solutions Inc.', 'user4', 0, 'password4'),
    ('TechTrend Enterprises', 'user5', 0, 'password5'),
    ('NextGen Industries', 'user6', 0, 'password6'),
    ('SilverStone Digital', 'user7', 0, 'password7'),
    ('Visionary Creations', 'user8', 0, 'password8'),
    ('Skyline Enterprises', 'user9', 0, 'password9'),
    ('Dynamic Global Holdings', 'user10', 0, 'password10'),
    ('Apex Technologies', 'user11', 0, 'password11'),
    ('Redwood Innovations', 'user12', 0, 'password12'),
    ('Horizon Digital Solutions', 'user13', 0, 'password13'),
    ('Quantum Enterprises', 'user14', 0, 'password14'),
    ('EagleEye Systems', 'user15', 0, 'password15'),
    ('Infinity Tech Group', 'user16', 0, 'password16'),
    ('BlueSky Creations', 'user17', 0, 'password17'),
    ('Vanguard Systems', 'user18', 0, 'password18'),
    ('FutureNow Technologies', 'user19', 0, 'password19'),
    ('GlobalTech Solutions', 'user20', 0, 'password20'),
    ('GreenWave Innovations', 'user21', 0, 'password21'),
    ('BrightFuture Enterprises', 'user22', 0, 'password22'),
    ('Streamline Systems', 'user23', 0, 'password23'),
    ('Peak Solutions Inc.', 'user24', 0, 'password24'),
    ('TechTrend Enterprises', 'user25', 0, 'password25'),
    ('NextGen Industries', 'user26', 0, 'password26'),
    ('SilverStone Digital', 'user27', 0, 'password27'),
    ('Visionary Creations', 'user28', 0, 'password28'),
    ('Skyline Enterprises', 'user29', 0, 'password29'),
    ('Dynamic Global Holdings', 'user30', 0, 'password30'),
    ('Apex Technologies', 'user31', 0, 'password31'),
    ('Redwood Innovations', 'user32', 0, 'password32'),
    ('Horizon Digital Solutions', 'user33', 0, 'password33'),
    ('Quantum Enterprises', 'user34', 0, 'password34'),
    ('EagleEye Systems', 'user35', 0, 'password35')
]

for name, username, role, password in users_data:
    User.objects.create_user(username=username, name=name, role=role, password=password)

print("Datos cargados exitosamente.")