// app/screens/AboutScreen.tsx

import React from "react";
import {
  View,
  ScrollView,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { HelloWave } from "@/components/HelloWave";
import { ThemedButton } from "@/components/ThemedButton";
import { ExternalLink } from "@/components/ExternalLink";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

// import { useTheme } from "@/hooks/useTheme";

const AboutScreen = () => {
  //   const { theme } = useTheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: "#8DD8FF",
        dark: "#1565C0",
      }}
      headerTitle={
        <ThemedText
          type="boldTitle"
          style={{
            textAlign:
              "center",
            flexWrap: "wrap",
          }}
        >
          About Us
        </ThemedText>
      }
    >
      <View
        style={{
          alignItems:
            "center",
          marginBottom: 30,
        }}
      >
        <ThemedText
          style={{
            textAlign:
              "center",
          }}
          type="title"
        >
          About MCC{" "}
          <HelloWave />
        </ThemedText>
      </View>

      <ThemedText
        style={{
          fontSize: 18,
          lineHeight: 26,
          textAlign: "center",
          paddingHorizontal: 10,
        }}
      >
        MCC (Mulik Cricket
        Council) is a
        community-driven
        cricket council
        dedicated to promoting
        local cricket talent
        and fostering a love
        for the game. Our app
        is designed to connect
        players, teams, and
        fans, making it easier
        to follow matches,
        manage teams, and
        celebrate the spirit
        of cricket in our
        community. This
        Organization is
        committed to providing
        a platform for players
        to showcase their
        skills and for fans to
        engage with the game
        they love. This
        Organization was
        established in 2021 by
        Muhammad Masab and a
        group of passionate
        cricket enthusiasts
        who wanted to create a
        vibrant cricketing
        community. Since then,
        we have grown to
        become a hub for
        cricket lovers,
        providing resources,
        support, and a
        platform for players
        to connect and
        showcase their talent.
        Our mission is to
        promote the game of
        cricket at the
        grassroots level,
        encouraging
        participation,
        sportsmanship, and a
        sense of community
        among players and fans
        alike. We believe that
        cricket is more than
        just a sport; it's a
        way to bring people
        together, celebrate
        talent, and create
        lasting memories.
        Through our app, we
        aim to make cricket
        more accessible and
        enjoyable for
        everyone, from players
        to fans. Whether
        you're a seasoned
        player or a newcomer
        to the game, MCC is
        here to support you on
        your cricketing
        journey. Join us in
        celebrating the spirit
        of cricket and be a
        part of our growing
        community! There are
        Good Name in This
        Organization who are
        working hard to make
        this Organization a
        success. Some Big
        names include: Rab
        Nawaz Sadiq, Malik
        Amjid, and Dr. Rehmat.
      </ThemedText>
      <View
        style={{
          alignItems:
            "center",
          marginBottom: 30,
        }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/dlnlkcjfx/image/upload/v1746354921/new_pt4hkr.jpg",
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 20,
          }}
        />
        <ThemedText
          style={{
            textAlign:
              "center",
          }}
          type="title"
        >
          About Me{" "}
          <HelloWave />
        </ThemedText>
      </View>

      <ThemedText
        style={{
          fontSize: 18,
          lineHeight: 26,
          textAlign: "center",
          paddingHorizontal: 10,
        }}
      >
        Hello! I'm the
        developer behind this
        cricket app. I'm
        passionate about
        technology, cricket,
        and building beautiful
        apps that are simple
        and useful. This app
        is made with 💙 using
        React Native and
        MongoDB to celebrate
        local cricket talent!
      </ThemedText>
      <View
        style={{
         display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: 20,
            marginTop: 30,
        }}
      >
        <ExternalLink href="https://www.instagram.com/mdma5ab/">
          <AntDesign
            size={28}
            name="instagram"
            color={"#8DD8FF"}
          />
        </ExternalLink>
        <ExternalLink href="https://github.com/masabharry">
          <AntDesign
            size={28}
            name="github"
            color={"#8DD8FF"}
          />
        </ExternalLink>
        <ExternalLink href="https://x.com/mdmasab6297">
          <AntDesign
            size={28}
            name="twitter"
            color={"#8DD8FF"}
          />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/muhammad-masab-masab-969338368/">
          <Entypo
            name="linkedin"
            size={28}
            color="#8DD8FF"
          />
        </ExternalLink>
      </View>
      <ThemedText
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "#000",
          marginTop: 30,
        }}
      >
        Version 1.0.0 • Built
        with 💻
      </ThemedText>
    </ParallaxScrollView>
  );
};

export default AboutScreen;
