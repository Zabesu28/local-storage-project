import { useState } from "react";
import { useEffect } from "react";
import Logo from "../assets/logo.png"
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export const Header = () => {

    const {user, logout} = useContext(AuthContext);
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "medium");

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
        document.documentElement.removeAttribute('class');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="Taskmate logo"/>
                <span>Taskmate { user ? user.username : ''} |</span>
                <button onClick={() => logout()}>Déconnexion</button>
            </div>
            <div className="themeSelector">
                <span onClick={() => setTheme("light")} className={theme === "light" ? "light activeTheme" : "light"}></span>
                <span onClick={() => setTheme("medium")} className={theme === "medium" ? "medium activeTheme" : "medium"}></span>
                <span onClick={() => setTheme("dark")} className={theme === "dark" ? "dark activeTheme" : "dark"}></span>
                <span onClick={() => setTheme("gone")} className={theme === "gone" ? "gone activeTheme" : "gone"}></span>
                <span onClick={() => setTheme("gTwo")} className={theme === "gTwo" ? "gTwo activeTheme" : "gTwo"}></span>
                <span onClick={() => setTheme("gThree")} className={theme === "gThree" ? "gThree activeTheme" : "gThree"}></span>
            </div>
        </header>
    )
}

export default Header;