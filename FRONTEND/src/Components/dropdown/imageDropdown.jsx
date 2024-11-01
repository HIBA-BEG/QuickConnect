import { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  margin-top: 20px;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #E5E7EB;
  padding: 10px;
  border-radius: 5px;
`;

const DropdownContent = styled.div`
  margin-top: 10px;
  border-top: 1px solid #ccc;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
`;

const Dropdown = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </DropdownHeader>
      <DropdownContent isOpen={isOpen}>
        {isOpen && (
          <Carousel>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
          </Carousel>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
