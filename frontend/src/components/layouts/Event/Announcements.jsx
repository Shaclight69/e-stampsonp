import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #ffd966;
  color: #0a1172;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

function Announcements() {
  return (
    <div>
      <Container>~ All Philatelic Activities in One Place ~</Container>
    </div>
  );
}

export default Announcements;
