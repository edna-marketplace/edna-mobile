import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Box } from "@gluestack-ui/themed";

const { height: screenHeight } = Dimensions.get("window");

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
  overlayColor?: string;
  animationDuration?: number;
};

export function Drawer({
  isOpen,
  onClose,
  children,
  height = screenHeight * 0.45,
  overlayColor = "rgba(0, 0, 0, 0.3)",
  animationDuration = 250,
}: Props) {
  const translateY = useRef(new Animated.Value(height)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, translateY, overlayOpacity, height, animationDuration]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Box flex={1} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height,
          transform: [{ translateY }],
        }}
      >
        <Box
          flex={1}
          bg="$white"
          shadowColor="$black"
          shadowOffset={{ width: 0, height: -2 }}
          shadowOpacity={0.25}
          shadowRadius={8}
          elevation={5}
          borderTopLeftRadius="$xl"
          borderTopRightRadius="$xl"
        >
          {children}
        </Box>
      </Animated.View>
    </Modal>
  );
}
