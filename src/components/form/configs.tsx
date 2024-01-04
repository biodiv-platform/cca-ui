export const selectStyles = {
  control: (p, { isDisabled }) => ({
    ...p,
    cursor: "text",
    borderColor: "var(--chakra-colors-gray-300)",
    background: isDisabled ? "#EEF2F7" : "white"
  }),
  placeholder: (p) => ({
    ...p,
    color: "#757474"
  }),
  valueContainer: (p) => ({ ...p, height: "38px" }),
  menu: (p) => ({ ...p, minWidth: "20em" }),
  menuPortal: (p) => ({ ...p, zIndex: 1900 }),
  clearIndicator: (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black"
  })
};

export const reactSelectProps = {
  styles: {
    control: (p) => ({ ...p, cursor: "text", borderRadius: "var(--chakra-radii-md)" }),
    valueContainer: (p) => ({ ...p, height: "38px" }),
    menu: (p) => ({ ...p, minWidth: "20em" }),
    menuPortal: (p) => ({ ...p, zIndex: 1900 }),
    clearIndicator: (p) => ({ ...p, paddingLeft: 0 })
  },
  theme: (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      neutral50: "var(--chakra-colors-gray-500)",
      neutral20: "var(--chakra-colors-gray-300)",
      primary25: "var(--chakra-colors-gray-100)",
      primary: "var(--chakra-colors-blue-500)"
    }
  })
};
