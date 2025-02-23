import { useState } from "react";
import React from 'react';

async function fetchConselho() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        //console.log(data)
        return data.slip.advice;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchCachorro(numero: number) {
    try {
        const respost = await fetch(`https://http.dog/${numero}.jpg`);
        if (!respost.ok) {
            throw new Error(`Erro na requisição: ${respost.status} - ${respost.statusText}`);
        }
        // Como a resposta é uma imagem, usamos blob() para pegar os dados binários
        const imageBlob = await respost.blob();

        // Cria uma URL temporária para a imagem
        const imageUrl = URL.createObjectURL(imageBlob);

        console.log(imageUrl);  // Exibe a URL da imagem no console

        return imageUrl;  // Retorna a URL da imagem para uso posterior
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }

}

const Apis = () => {

    const [guardarConselho, setGuardarConselho] = useState('');
    const [guardarCachorros, setGuardarCachorros] = useState('');
    const [numeroAleatorio, setNumeroAleatorio] = useState('');
    const [erro, setErro] = useState('');

    const RedirecionarParaSite =()=>{
         // Abre o site em uma nova aba
         window.open('https://http.dog/', '_blank'); // _blank abre em uma nova aba


    };

    let imagemDiv = null;
    if (guardarCachorros) {
        imagemDiv = (
            <div style={{ textAlign: 'center', color: '#87CEFA' }}>
                <h3>Dog image:</h3>
                <img src={guardarCachorros} alt="Cachorro" style={{
                    width: '500px',  // Ajusta a largura da imagem
                    height: 'auto'   // Mantém a proporção da imagem
                }} />
            </div>
        );
    }


    const PressTheButtonAPI2 = async () => {
        const numero = Number(numeroAleatorio)
        setErro('');
        try {
            const cachorro = await fetchCachorro(numero);
            setGuardarCachorros(cachorro);
        } catch (error) {
            setErro('Número não encontrado para a imagem ou erro na requisição.');
            setGuardarCachorros('');

        }

    }

    // useEffect(() => {
    const PressTheButtonAPI = async () => {
        const conselho = await fetchConselho();
        setGuardarConselho(conselho);
    };

    //     fetchData();
    //   }, []);

    return (

        <div style={{
            width: '100vw',
            height: '100vh',
            // position: 'absolute',
            backgroundColor: '#333333'  /* Só para visualização */
        }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column', // Alinha os botões na coluna
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop: '20px',
                }}
            >
                {/* Botão API Textos */}
                <button
                    onClick={PressTheButtonAPI}
                    style={{
                        color: '#D3D3D3',
                        backgroundColor: 'black',
                        fontSize: '20px',
                        padding: '15px 30px',
                        width: '200px',
                        height: '60px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginBottom: '20px', // Espaço entre os botões
                        marginTop: '50px'
                    }}
                >
                    API advice
                </button>

                {/* Botão API Cachorros */}
                <button
                    onClick={PressTheButtonAPI2}
                    style={{
                        color: '#87CEFA',
                        backgroundColor: 'black',
                        alignContent: 'center',
                        alignItems: 'center',
                        fontSize: '20px',
                        padding: '15px 30px',
                        width: '200px',
                        height: '60px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginBottom: '10px', // Espaço entre o botão e a caixa de input
                    }}
                >
                    API dogs
                </button>

                {/* Caixa de input */}
                <input
                    type="text"
                    value={numeroAleatorio}
                    onChange={(e) => setNumeroAleatorio(e.target.value)}
                    placeholder="Digite o número"
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '200px',
                        borderRadius: '5px',
                        border: '1px solid black',
                        marginBottom: '10px', // Espaço abaixo do input
                    }}
                />
            </div>
            <div style={{
                display:'flex',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <button style = {{
                   backgroundColor: '#2F4F4F',
                    color:'#87CEFA',
                    border:'none',
                    borderRadius: '5px',
                    cursor:'pointer'  
                }}

                onClick={RedirecionarParaSite}>
               Check numbers 
                </button>
            </div>

            {/* Exibe o conselho */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '15px',
                }}
            >
                <div style={{ color: '#D3D3D3' }}>
                    {guardarConselho}
                </div>
            </div>
            {erro && <div style={{ color: 'red', textAlign: 'center' }}>{erro}</div>} {/* Exibe a mensagem de erro */}
            {imagemDiv}
        </div >

    );
}
export default Apis;