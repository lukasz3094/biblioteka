-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 07 Paź 2022, 14:01
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `biblioteka`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `autorzy`
--

CREATE TABLE `autorzy` (
  `id_autora` int(11) NOT NULL,
  `imie` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nazwisko` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `autorzy`
--

INSERT INTO `autorzy` (`id_autora`, `imie`, `nazwisko`) VALUES
(1, 'Robert', 'Martin'),
(2, 'Adam', 'Freeman'),
(3, 'Mariot', 'Tsitoara'),
(4, 'John', 'Tolkien');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `egzemplarze`
--

CREATE TABLE `egzemplarze` (
  `id_egzemplarza` int(11) NOT NULL,
  `isbn` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `id_ksiazki` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `egzemplarze`
--

INSERT INTO `egzemplarze` (`id_egzemplarza`, `isbn`, `id_ksiazki`) VALUES
(1, '9788328354982', 1),
(2, '9788328354982', 1),
(3, '9788328387355', 2),
(4, '9788328387355', 2),
(5, '9788328302341', 3),
(6, '9788328302341', 3),
(7, '9788324402052', 4),
(8, '9788324402052', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kategorie`
--

CREATE TABLE `kategorie` (
  `id_kategorii` int(11) NOT NULL,
  `nazwa` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `kategorie`
--

INSERT INTO `kategorie` (`id_kategorii`, `nazwa`) VALUES
(1, 'informatyka'),
(2, 'fantasy');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ksiazka`
--

CREATE TABLE `ksiazka` (
  `id_ksiazki` int(11) NOT NULL,
  `tytul` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `id_autora` int(11) NOT NULL,
  `rok_wydania` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `id_kategorii` int(11) NOT NULL,
  `isbn` varchar(13) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `ksiazka`
--

INSERT INTO `ksiazka` (`id_ksiazki`, `tytul`, `id_autora`, `rok_wydania`, `id_kategorii`, `isbn`) VALUES
(1, 'Vue.js 2. Wprowadzenie dla profesjonalistow', 2, '2019', 1, '9788328354982'),
(2, 'Git i GitHub. Kontrola wersji, zarzadzanie projektami i zasady pracy zespolowej', 3, '2022', 1, '9788328387355'),
(3, 'Czysty kod. Podrecznik dobrego programisty', 1, '2014', 1, '9788328302341'),
(4, 'Hobbit', 4, '2014', 2, '9788324402052');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `termin`
--

CREATE TABLE `termin` (
  `id_termin` int(11) NOT NULL,
  `data_wypozyczenia` date NOT NULL,
  `data_oddania` date NOT NULL,
  `id_egzemplarza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `termin`
--

INSERT INTO `termin` (`id_termin`, `data_wypozyczenia`, `data_oddania`, `id_egzemplarza`) VALUES
(35, '2022-10-07', '2022-11-06', 1),
(36, '2022-10-07', '2022-11-06', 3),
(37, '2022-10-07', '2022-11-06', 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_login`
--

CREATE TABLE `user_login` (
  `id_login` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_login` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `user_login`
--

INSERT INTO `user_login` (`id_login`, `username`, `password`, `last_login`) VALUES
(2, 'test', '$2a$10$VyO.dtdyCanD.Ht/c6SC5OsS/DnaXIhM4K1NYhimwG1T.P3n8gp3G', '2022-10-06');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wypozyczenia`
--

CREATE TABLE `wypozyczenia` (
  `id_wypozyczenia` int(11) NOT NULL,
  `id_egzemplarza` int(11) NOT NULL,
  `id_login` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `wypozyczenia`
--

INSERT INTO `wypozyczenia` (`id_wypozyczenia`, `id_egzemplarza`, `id_login`) VALUES
(32, 1, 2),
(33, 3, 2),
(34, 5, 2);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `autorzy`
--
ALTER TABLE `autorzy`
  ADD PRIMARY KEY (`id_autora`);

--
-- Indeksy dla tabeli `egzemplarze`
--
ALTER TABLE `egzemplarze`
  ADD PRIMARY KEY (`id_egzemplarza`),
  ADD KEY `FK_ks_egz` (`id_ksiazki`);

--
-- Indeksy dla tabeli `kategorie`
--
ALTER TABLE `kategorie`
  ADD PRIMARY KEY (`id_kategorii`);

--
-- Indeksy dla tabeli `ksiazka`
--
ALTER TABLE `ksiazka`
  ADD PRIMARY KEY (`id_ksiazki`),
  ADD KEY `FK_autor` (`id_autora`),
  ADD KEY `FK_kategoria` (`id_kategorii`);

--
-- Indeksy dla tabeli `termin`
--
ALTER TABLE `termin`
  ADD PRIMARY KEY (`id_termin`),
  ADD KEY `FK_termin` (`id_egzemplarza`);

--
-- Indeksy dla tabeli `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`id_login`);

--
-- Indeksy dla tabeli `wypozyczenia`
--
ALTER TABLE `wypozyczenia`
  ADD PRIMARY KEY (`id_wypozyczenia`),
  ADD KEY `FK_wypozycz_egz` (`id_egzemplarza`),
  ADD KEY `FK_login` (`id_login`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `autorzy`
--
ALTER TABLE `autorzy`
  MODIFY `id_autora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `egzemplarze`
--
ALTER TABLE `egzemplarze`
  MODIFY `id_egzemplarza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `kategorie`
--
ALTER TABLE `kategorie`
  MODIFY `id_kategorii` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `ksiazka`
--
ALTER TABLE `ksiazka`
  MODIFY `id_ksiazki` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `termin`
--
ALTER TABLE `termin`
  MODIFY `id_termin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT dla tabeli `user_login`
--
ALTER TABLE `user_login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `wypozyczenia`
--
ALTER TABLE `wypozyczenia`
  MODIFY `id_wypozyczenia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `egzemplarze`
--
ALTER TABLE `egzemplarze`
  ADD CONSTRAINT `FK_ks_egz` FOREIGN KEY (`id_ksiazki`) REFERENCES `ksiazka` (`id_ksiazki`);

--
-- Ograniczenia dla tabeli `ksiazka`
--
ALTER TABLE `ksiazka`
  ADD CONSTRAINT `FK_autor` FOREIGN KEY (`id_autora`) REFERENCES `autorzy` (`id_autora`),
  ADD CONSTRAINT `FK_kategoria` FOREIGN KEY (`id_kategorii`) REFERENCES `kategorie` (`id_kategorii`);

--
-- Ograniczenia dla tabeli `termin`
--
ALTER TABLE `termin`
  ADD CONSTRAINT `FK_termin` FOREIGN KEY (`id_egzemplarza`) REFERENCES `egzemplarze` (`id_egzemplarza`);

--
-- Ograniczenia dla tabeli `wypozyczenia`
--
ALTER TABLE `wypozyczenia`
  ADD CONSTRAINT `FK_login` FOREIGN KEY (`id_login`) REFERENCES `user_login` (`id_login`),
  ADD CONSTRAINT `FK_wypozycz_egz` FOREIGN KEY (`id_egzemplarza`) REFERENCES `egzemplarze` (`id_egzemplarza`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
