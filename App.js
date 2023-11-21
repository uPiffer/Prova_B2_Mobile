import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const App = () => {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const obterPersonagens = async () => {
      try {
        const resposta = await fetch('https://swapi.dev/api/people/');
        const dados = await resposta.json();
        setPersonagens(dados.results);
      } catch (erro) {
        console.error('Erro ao obter personagens:', erro);
      } finally {
        setCarregando(false);
      }
    };

    obterPersonagens();
  }, []);

  if (carregando) {
    return (
      <View style={[styles.container, styles.fundoCinzaEscuro]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.fundoCinzaEscuro]}>
      <Text style={styles.titulo}>Personagens de Star Wars</Text>
      <FlatList
        data={personagens}
        keyExtractor={(item) => item.name}
        numColumns={5}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.nomePersonagem, styles.textoBranco]}>{item.name}</Text>
            <View style={styles.caracteristicasContainer}>
              <Text style={styles.textoBranco}>Altura: {item.height}</Text>
              <Text style={styles.textoBranco}>Peso: {item.mass}</Text>
              <Text style={styles.textoBranco}>Cor do Cabelo: {item.hair_color}</Text>
              <Text style={styles.textoBranco}>Cor dos Olhos: {item.eye_color}</Text>
              <Text style={styles.textoBranco}>Cor da Pele: {item.skin_color}</Text>
              <Text style={styles.textoBranco}>Gênero: {item.gender}</Text>
              <Text style={styles.textoBranco}>Aniversário: {item.birth_year}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
    padding: 16,
  },
  fundoCinzaEscuro: {
    backgroundColor: '#222222',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFF00',
  },
  itemContainer: {
    flex: 1,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#333333',
    borderRadius: 8,
    margin: 8,
  },
  nomePersonagem: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  caracteristicasContainer: {
    marginTop: 8,
  },
  textoBranco: {
    color: '#ffffff',
  },
});

export default App;
