import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { getGenres } from "@/api/others";
import { GenreResponse } from "@/api/others";
import { FilterValue, ReducerAction } from "types/search";

interface GenreFormProps {
  filterValue: FilterValue;
  handleFilterValueChange: (action: ReducerAction) => void;
}

export default function GenreForm(props: GenreFormProps) {
  const [genresOptions, setGenresOptions] = useState<GenreResponse[]>([
    { genreId: 0, category: "전체" },
  ]);
  const [genreInputValue, setGenreInputValue] = useState("전체");
  // const [genreInputValue, setGenreInputValue] = useState(
  //   genresOptions.find()

  //     props.filterValue.genreId

  const handleGenreChange = (event: SelectChangeEvent<unknown>) => {
    setGenreInputValue(event.target.value as string);

    // 장르명 -> genreId로 변환
    const genreId = genresOptions.find(
      (genre) => genre.category === event.target.value
    )?.genreId;

    // 조부모 컴포넌트(SearchPage)의 filterValue를 변경
    props.handleFilterValueChange({
      type: "genreId",
      newValue: { ...props.filterValue, genreId: genreId as number },
    });
  };

  useEffect(() => {
    // 장르 옵션 불러오기
    const requestGenres = async () => {
      const response = await getGenres();
      setGenresOptions([
        { genreId: 0, category: "전체" },
        ...response.data.genres,
      ]); // prev => [prev, ...response.data.genres] 로 짜고 싶은데 안됨
    };
    requestGenres();
  }, []);

  return (
    <Wrapper>
      <div style={{ flexBasis: "15%" }}>
        <CustomInputLabel id="genre-select">장르</CustomInputLabel>
      </div>
      <div style={{ flexBasis: "85%" }}>
        <CustomSelect
          labelId="genre-select"
          value={genreInputValue}
          color="warning"
          onChange={handleGenreChange}
        >
          {genresOptions.map((genre) => (
            <MenuItem value={genre.category} key={genre.genreId}>
              {genre.category}
            </MenuItem>
          ))}
        </CustomSelect>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;
  border-radius: 10px;
  color: white;
`;

const CustomInputLabel = mstyled(InputLabel)({
  fontSize: "1.7rem",
  fontWeight: "600",
  color: "white",
  marginRight: "1.5rem",
});

const CustomSelect = mstyled(Select)({
  width: "11.5rem",
  height: "4rem",
  fontSize: "1.2rem",
  border: "1px solid white",
  color: "white",
  svg: {
    color: "white",
  },
});
