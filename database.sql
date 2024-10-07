CREATE DATABASE Librarydb;
USE Librarydb;

CREATE TABLE Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL, 
    Email VARCHAR(255) NOT NULL UNIQUE    
);

CREATE TABLE Categories (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Books (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    CategoryId INT NOT NULL,
    Summary TEXT,
    CONSTRAINT FK_Books_Category FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE Reviews (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    BookId INT NOT NULL,
    UserId INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5),
    Comment TEXT,
    ReviewDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Reviews_Book FOREIGN KEY (BookId) REFERENCES Books(Id),
    CONSTRAINT FK_Reviews_User FOREIGN KEY (UserId) REFERENCES Users(Id)
);

INSERT INTO Users (Username, Password, Email) VALUES
('usuario1', '123456789', 'usuario1@mail.com'),
('usuario2', '123456789', 'usuario2@mail.com'),
('usuario3', '123456789', 'usuario3@mail.com');

INSERT INTO Categories (Name) VALUES
('Ficción'),
('No ficción'),
('Ciencia ficción'),
('Fantasía'),
('Misterio'),
('Romance'),
('Biografía'),
('Historia');

INSERT INTO Books (Title, Author, CategoryId, Summary) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 1, 'Una novela que narra la historia de la familia Buendía en el pueblo ficticio de Macondo.'),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 1, 'Las aventuras de un hidalgo que se vuelve caballero andante.'),
('El amor en los tiempos del cólera', 'Gabriel García Márquez', 6, 'Una historia de amor que perdura a lo largo de los años.'),
('La sombra del viento', 'Carlos Ruiz Zafón', 5, 'Un joven descubre un libro en una misteriosa biblioteca en Barcelona.'),
('1984', 'George Orwell', 3, 'Una novela distópica que explora temas de vigilancia y totalitarismo.'),
('Sapiens: De animales a dioses', 'Yuval Noah Harari', 2, 'Un recorrido por la historia de la humanidad desde la prehistoria hasta nuestros días.');

INSERT INTO Books (Title, Author, CategoryId, Summary) VALUES
('Fahrenheit 451', 'Ray Bradbury', 3, 'Una novela sobre un futuro distópico donde los libros son prohibidos y "bomberos" queman cualquier que se encuentre.'),
('El túnel', 'Ernesto Sabato', 1, 'Un thriller psicológico que narra la obsesión de un artista por una mujer.'),
('La casa de los espíritus', 'Isabel Allende', 1, 'Una saga familiar que entrelaza la vida de varias generaciones con elementos mágicos.'),
('El juego del ángel', 'Carlos Ruiz Zafón', 5, 'Una novela que sigue a un escritor en la Barcelona de los años 1920, envuelto en un oscuro misterio.'),
('Crónica de una muerte anunciada', 'Gabriel García Márquez', 1, 'Una novela que relata los eventos que conducen al asesinato de Santiago Nasar.'),
('Cumbres borrascosas', 'Emily Brontë', 1, 'Una historia apasionada y trágica de amor y venganza entre los personajes Heathcliff y Catherine.'),
('Orgullo y prejuicio', 'Jane Austen', 6, 'La novela sigue la vida de Elizabeth Bennet y sus relaciones con el señor Darcy en el contexto de la sociedad inglesa del siglo XIX.'),
('El extranjero', 'Albert Camus', 1, 'Una novela que explora la absurdidad de la vida a través de la experiencia de Meursault, un hombre que se enfrenta a la muerte.'),
('Mujer en punto cero', 'Nawal El Saadawi', 1, 'La historia de Firdaus, una mujer en Egipto que busca la libertad en un mundo patriarcal.'),
('El retrato de Dorian Gray', 'Oscar Wilde', 1, 'Un joven que desea permanecer eternamente joven mientras su retrato envejece y refleja sus acciones morales.'); 

INSERT INTO Reviews (BookId, UserId, Rating, Comment) VALUES
(1, 1, 5, 'Una obra maestra de la literatura.'),
(1, 2, 4, 'Increíble, pero a veces un poco confuso.'),
(2, 1, 5, 'Clásico imprescindible.'),
(3, 2, 4, 'Una hermosa historia de amor.'),
(4, 1, 5, 'Una trama intrigante y emocionante.'),
(5, 3, 5, 'Una crítica social que sigue siendo relevante.'),
(6, 2, 4, 'Interesante y bien escrito, pero a veces denso.');

SELECT * FROM Users;
