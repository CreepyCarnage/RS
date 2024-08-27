import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  background-color: #e6d5b8;
  padding: 40px;
  font-family: Arial, sans-serif;
`;

const LeftColumn = styled.div`
  flex: 1;
  padding-right: 40px;
`;

const RightColumn = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: white;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: white;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DiamondOverlay = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  transform: rotate(45deg);
  top: -15px;
  right: -15px;
`;

const AboutUs = () => {
  return (
    <AboutContainer>
      <LeftColumn>
        <Title>About <span style={{fontWeight: 'normal'}}>us</span></Title>
        <Subtitle>Add description</Subtitle>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
          do eiusmod tempor incididunt ut labore et dolore magna 
          aliqua. Ut enim ad minim veniam.
        </Description>
        <Description>
          Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat. Duis aute irure dolor in reprehenderit 
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint.
        </Description>
      </LeftColumn>
      <RightColumn>
        <ImageContainer>
          <Image src="path_to_reception_image.jpg" alt="Reception" />
          <DiamondOverlay />
        </ImageContainer>
        <ImageContainer>
          <Image src="path_to_bedroom_image.jpg" alt="Bedroom" />
        </ImageContainer>
        <ImageContainer>
          <Image src="path_to_living_room_image.jpg" alt="Living Room" />
        </ImageContainer>
        <ImageContainer>
          <Image src="path_to_hallway_image.jpg" alt="Hallway" />
          <DiamondOverlay />
        </ImageContainer>
      </RightColumn>
    </AboutContainer>
  );
};

export default AboutUs;