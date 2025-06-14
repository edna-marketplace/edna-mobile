import { ClotheDetailsImage } from "@/dtos/ClotheDetailsDTO";
import { Box, HStack, Image, VStack } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import PagerView from "react-native-pager-view";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  entries: ClotheDetailsImage[];
};

export function ClotheImagesCarousel({ entries }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const theme = gluestackUIConfig.tokens.colors;

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(0);
      pagerRef.current?.setPage(0);
    }, [])
  );
  return (
    <VStack>
      <Box w="$full" h="$96">
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={currentPage}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {entries.map((item, index) => (
            <Box key={index} w="90%" alignSelf="center" mt="$6" rounded="$xl">
              <LinearGradient
                colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  borderRadius: 15,
                  paddingVertical: 3,
                  paddingHorizontal: 3,
                }}
              >
                <Image
                  source={item.url}
                  alt=""
                  w="$full"
                  h="$full"
                  rounded="$xl"
                  resizeMode="cover"
                />
              </LinearGradient>
            </Box>
          ))}
        </PagerView>
      </Box>

      <HStack
        justifyContent="center"
        alignItems="center"
        gap="$2"
        mt="$3"
        w="$full"
      >
        {entries.map((_, index) => (
          <Box
            key={index}
            w={currentPage === index ? 10 : 6}
            h={currentPage === index ? 10 : 6}
            rounded="$full"
            bg={currentPage === index ? "$redDark" : "$base400"}
            opacity={0.8}
          />
        ))}
      </HStack>
    </VStack>
  );
}
