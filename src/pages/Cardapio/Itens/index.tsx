import { useEffect, useState } from "react";
import { Item } from "./Item";
import cardapio from "./itens.json";
import styles from "./Itens.module.scss";

interface Props {
    busca: string;
    filtro: number | null;
    ordenador: string;
}

export const Itens: React.FC<Props> = ({
    busca,
    filtro,
    ordenador
}) => {

    const [lista, setLista] = useState(cardapio);

    function testaBusca(title: string) {
        const regex = new RegExp(busca, "i");
        return regex.test(title);
    }

    function testaFiltro(id: number) {
        if (filtro !== null) return filtro === id;
        return true;
    }

    function ordernarPropriedadeCrescente(
        lista: typeof cardapio,
        propriedade: "size" | "serving" | "price"
    ) {
        return lista.sort((a, b) => a[propriedade] - b[propriedade]);
    }

    function ordenar(lista: typeof cardapio) {
        switch(ordenador) {
            case "porcao": 
                return ordernarPropriedadeCrescente(lista, "size");
            case "qtd_pessoas":
                return ordernarPropriedadeCrescente(lista, "serving");
            case "preco":
                return ordernarPropriedadeCrescente(lista, "price");
            default:
                return lista;
        }
    }

    useEffect(() => {
        const listaFiltrada = cardapio.filter((item) => {
            return testaBusca(item.title) && testaFiltro(item.category.id);
        });
        setLista(ordenar(listaFiltrada));
    }, [busca, filtro, ordenador]);

    return (

        <div className={styles.itens}>
            {lista.map((item) => (
                <Item 
                    key={item.id}
                    {...item}
                />
            ))} 
        </div>
        
    );
}