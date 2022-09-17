import styled from "styled-components";

interface Props {
  width: number | string;
  height: number | string;
  active?: boolean;
}

export const Logo = (props: Props) => {
  return (
    <SVG {...props} viewBox="0 -2 30 28" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.23111 19.25L13.5 7.85897L20.7689 19.25H6.23111Z"
        strokeWidth="2"
      />
      <path
        d="M21.475 3.36145L23.6358 5.51799M22.3916 2.44663C22.6782 2.16066 23.0668 2 23.472 2C23.8773 2 24.2659 2.16066 24.5525 2.44663C24.839 2.73261 25 3.12047 25 3.5249C25 3.92933 24.839 4.3172 24.5525 4.60317L16.1388 13H14V10.8215L22.3916 2.44663V2.44663Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

const SVG = styled.svg<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  stroke: ${(props) => (props.active ? "blue" : "black")};
  fill: ${(props) => (props.active ? "blue" : "none")};
  transition: fill 0.2s, stoke 0.2s;
`;
