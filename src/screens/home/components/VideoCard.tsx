import React from "react";
import { Box, Heading, Text } from "@/components/Themed";
import { Container } from "@/components/Themed/Layout";
import { useNavigation } from "@react-navigation/native";
import { Linking, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { Center, Pressable, Image, View } from "native-base";
import BaseUrl from "@/constants/BaseUrl";
import Layout from "@/constants/Layout";
import Breakpoints from "@/constants/Breakpoints";
import { FACEBOOK_EVENT, fbEvent, openUrl } from "@/utils";

const video1 = require("@/assets/video1.mp4");
const video2 = require("@/assets/video2.mp4");
const cardBtn = require("@/assets/images/card-btn.png");

const VideoCard = ({
  type,
  offsetY,
  oriageScrollHeight,
}: {
  type: number;
  offsetY: number;
  oriageScrollHeight: number;
}) => {
  const { navigate } = useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isMuted, setIsMuted] = React.useState(true);

  const ref = React.useRef<any>(null);

  const facebookHandle = React.useCallback(async () => {
    try {
      // Settings.initializeSDK();
      // AppEventsLogger.logEvent("Click 24H Trade by video", {
      //   date: new Date().toString(),
      // });
      fbEvent(FACEBOOK_EVENT.CLICK_BY_VIDEO);
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      ref?.current?.measure(
        (x: any, y: any, width: any, height: any, pageX: any, pageY: any) => {
          if (pageY + height > 0 && pageY - oriageScrollHeight < 0) {
            setIsMuted(false);
          } else {
            setIsMuted(true);
          }
          // console.log(pageY, offsetY);
          // if (offsetY > pageY && offsetY < pageY + height) {
          // }
        }
      );
    }
  }, [offsetY, oriageScrollHeight]);

  return (
    <View ref={ref} style={styles.box}>
      <Container>
        <Pressable
          onPress={() => {
            // navigate('Detail', { id: `${1}` })
            openUrl(BaseUrl.downloadAndroid);
          }}
        >
          <View>
            <Box paddingTop={3} paddingBottom={1}>
              <Heading marginBottom={2}>
                Como é ganhar de R$ 30.000 a R$ 40.000 por mês?
              </Heading>
              <Box style={styles.video}>
                <>
                  {type === 1 && (
                    <Video
                      ref={video}
                      style={styles.video}
                      source={video1}
                      useNativeControls={false}
                      resizeMode={ResizeMode.CONTAIN}
                      videoStyle={styles.videoStyle}
                      shouldPlay
                      isLooping
                      isMuted={isMuted}
                      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                    />
                  )}
                </>
                <>
                  {type === 2 && (
                    <Video
                      ref={video}
                      style={styles.video}
                      source={video2}
                      videoStyle={styles.videoStyle}
                      useNativeControls={false}
                      resizeMode={ResizeMode.STRETCH}
                      shouldPlay
                      isLooping
                      isMuted={isMuted}
                      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                    />
                  )}
                </>
              </Box>
              <Text marginTop={2}>
                Minha renda mensal é superior a 40.000 reais, às vezes 100.000
                reais, às vezes 30.000 reais ou 40.000 reais. Muitas pessoas
                podem pensar que estou fingindo, mas isso não é nada para quem
                está realmente ganhando dinheiro.
              </Text>
            </Box>
          </View>
        </Pressable>
        <Box width="100%">
          <Pressable
            marginTop={2}
            onPress={() => {
              facebookHandle();
              openUrl(BaseUrl.downloadAndroid);
            }}
            width="100%"
          >
            <Box height="45px" width="100%" bgColor="#f5bd00" borderRadius={45}>
              <Text
                color="#854600"
                lineHeight={"45px"}
                textAlign="center"
                fontSize={16}
                bold
              >
                Clique para aprender mais
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    marginBottom: 8,
    width: "100%",
  },
  // bgColor='backgroundCard' paddingY={2} mb={2} width="100%"
  video: {
    // flex: 1,
    height: Layout.window.width - Breakpoints.LayoutPaddingX * 2,
    width: Layout.window.width - Breakpoints.LayoutPaddingX * 2,
  },
  videoStyle: {
    width: '100%',
    height: '100%',
  }
});

export default VideoCard;
