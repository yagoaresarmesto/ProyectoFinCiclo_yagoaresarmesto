import React, {useState, useEffect} from "react";
import { Container, Grid, GridColumn, Image, Input } from "semantic-ui-react";
import Link from "next/link"; //Una función de next que no permite usar links
import { useRouter } from "next/router";

export default function TopBar() {
    return (
        <div className="top-bar">
            <Container>

                <Grid className="top-bar">
                    <Grid.Column width={8} className="top-bar__izquierda">
                        <Logo />
                    </Grid.Column>

                    <Grid.Column width={8} className="top-bar__derecha">
                        <Search />
                    </Grid.Column>
                </Grid>

            </Container>
        </div>

    );
}

//Es una función que me permite mostrar una imagen

function Logo() {
    return (
        <Link href="/">
            <a>
                <Image src="/SHOPLOGO1.png" alt="Logo" />
            </a>
        </Link>
        //Con la barra ya accedes directamente a public
    )
}

//El buscador
function Search() {
    const [searchStr, setSearchStr] = useState(""); //Guardamos el input del search
    const [load, setLoad] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      if (load) {
        router.push(`/search?query=${searchStr}`);
      }
      setLoad(true);
    }, [searchStr]);

    return (
        <Input
            id="search-product"
            icon={{ name: "search" }}
            value={searchStr} onChange={(_, data) => setSearchStr(data.value)}
            placeholder="
       ¿Qué estás buscando?"
        />
    )
}