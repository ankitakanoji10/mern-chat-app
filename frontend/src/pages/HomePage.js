import React from 'react'
import { Container } from '@chakra-ui/react'
import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);


  return (
     <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Real-time chat 
        </Text>
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="lg" color = "black" borderWidth="1px">
             <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList mb = '1em'>
                <Tab width = "50%">Log in</Tab>
                <Tab width = "50%">Sign up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <Login/>
                </TabPanel>
                <TabPanel>
                <Signup/>
                </TabPanel>
            </TabPanels>
            </Tabs>
          </Box>
          
      </Container>
      
  )
}

export default HomePage
