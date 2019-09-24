import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Button, Col, Row, Container, Form } from 'react-bootstrap';
import styled from 'styled-components';

const EmployeeSettingsContainer = styled(Container)`
    margin-top: 2%;
`;

const Wrapper = styled.div`
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Heading = styled.label`
	color: #696969;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 2em;
	font-weight: lighter;
`;

const SubHeading = styled.label`
	color: #696969;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1em;
	font-weight: lighter;
    margin-top: 10px;
`;

const Seperator = styled.hr`
	margin: 0px;
`;

const StyledButton = styled(Button)`
	width: 15%;
	background-color: steelblue;
	:hover{
		background-color: royalblue;
	}
	border: none;
	padding: 8px 10px 8px 10px;
	border-radius: 5px;
	margin-right: 5px;
`;

type EmployeeSettings = {

}

export default () => {

    const [payoutAddress, setPayoutAddress] = useState('');
    const [spouseId, setSpouseId] = useState('');

    return (
        <EmployeeSettingsContainer>
            <Wrapper>
                <Heading>Employee Settings</Heading>
                <Seperator></Seperator>
                <Form>
                    <Form.Row as={Col}>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Label>
                                        <SubHeading>Set Payout Address</SubHeading>
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Control
                                        type="text"
                                        onKeyUp={(e: any) => { setPayoutAddress(e.target.value) }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <StyledButton onClick={() => ""}>Save</StyledButton>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row as={Col}>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Label>
                                        <SubHeading>Add Spouse ID</SubHeading>
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Control
                                        type="text"
                                        onKeyUp={(e: any) => { setSpouseId(e.target.value) }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <StyledButton onClick={() => ""}>Save</StyledButton>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Wrapper>
        </EmployeeSettingsContainer>
    )
}