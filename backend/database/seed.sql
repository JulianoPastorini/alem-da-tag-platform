USE alem_da_tag;

INSERT INTO autores (nome, email, cargo, linkedin_url) VALUES
('Marina Souza', 'marina.souza@alemdatag.dev', 'Staff Analytics Engineer', 'https://linkedin.com/in/marinasouza'),
('Rafael Costa', 'rafael.costa@alemdatag.dev', 'Data & Martech Architect', 'https://linkedin.com/in/rafaelcosta');

INSERT INTO trilhas (titulo, nivel, carga_horaria, autor_id) VALUES
('Fundamentos de GA4 e Rastreamento de Eventos', 'Iniciante', 16, 1),
('CDP, Server-Side Tagging e SQL para Martech', 'Intermediário', 24, 2);

INSERT INTO membros (nome, email, area_interesse) VALUES
('Lucas Pereira', 'lucas.pereira@email.com', 'Web Analytics'),
('Camila Rocha', 'camila.rocha@email.com', 'Engenharia de Dados'),
('Diego Almeida', 'diego.almeida@email.com', 'Martech');

INSERT INTO inscricoes (membro_id, trilha_id, status) VALUES
(1, 1, 'Ativo'),
(2, 1, 'Ativo'),
(2, 2, 'Ativo'),
(3, 2, 'Concluído');