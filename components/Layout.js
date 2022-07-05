import styles from "../styles/Layout.module.css"
import Nav from "./Nav"
export default function Layout({children}){
    return(
        <div>
            <Nav/>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}