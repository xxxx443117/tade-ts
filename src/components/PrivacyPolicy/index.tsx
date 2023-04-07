import { Center } from "native-base";
import { Box, Button, Heading, ScrollView, Text } from "../Themed"
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { openUrl } from "@/utils";
import BaseUrl from "@/constants/BaseUrl";

const STORAGEkEY = 'storage:privacy';

const PrivacyPolicy = () => {

  const [enable, setEnable] = React.useState(true)
  const getStorage = React.useCallback(async () => {
    try {
      const _enable = await AsyncStorage.getItem(
        STORAGEkEY,
      );
      setEnable(Boolean(_enable))
    } catch (error) {
      // Error saving data
    }
  }, [])

  
  const saveStorage = React.useCallback(async () => {
    try {
      const _enable = await AsyncStorage.setItem(
        STORAGEkEY,
        'enable'
      );
      setEnable(true)
    } catch (error) {
      // Error saving data
    }
  }, [])


  React.useEffect(() => {
    getStorage()
  }, [getStorage])
  
  if (enable) return null
  return (
    <Center position='fixed' top={0} zIndex={99999} left={0} height='100%' width='100%' background='rgba(0, 0, 0, 0.5)'>
      <Box borderRadius={16} background='#ffffff' width='80%' height='50%' padding='24px'>
        <Heading marginBottom='16px' textAlign='center'>Acordo de serviço </Heading>
        <ScrollView >
          <Text>Caro usuário, obrigado por sua confiança em 24H Notícias</Text>
          <Text mt='16px'>Formulamos o "<Text onPress={() => {
            console.log('---')
            openUrl(BaseUrl.privacyPolicy);
          }} color='#1531ff'>Contrato do usuário 24H Notícias</Text>" de acordo com as leis relevantes. Leia com atenção e compreenda completamente os termos relevantes antes de clicar para concordar. Os principais termos foram marcados para você, para que você possa entender seus direitos.</Text>

          <Text  mt='16px'>Explicaremos a você através da política de privacidade da seguinte forma:</Text>

          <Text>1. Disposições Gerais e Objeto do Acordo</Text>
          <Text>2. Comunicações e Fornecimento de Informações</Text>
          <Text>3. Termos de uso dos serviços 24H Notícias</Text>
          <Text>4. Reivindicações e Resolução de Disputas</Text>
          <Text>5. Lei Aplicável</Text>
          <Text>6. Força Maior</Text>
          <Text>7. Responsabilidade das Partes</Text>
          <Text>8. Vigência e Rescisão do Contrato</Text>
          <Text>9. Disposições Finais</Text>
          <Text>10. Lista de países nos quais a empresa não faz negócios</Text>
        </ScrollView>
        <Box mt='16px'>
          <Button variant="subtle" onPress={saveStorage} title={"concorde e continue"}></Button>
        </Box>
      </Box>
    </Center>
  )
}

export default PrivacyPolicy;
