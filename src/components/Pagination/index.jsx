import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        sx={{ minWidth: 100 }} // Using sx for styling
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={{ minWidth: 100 }} // Using sx for styling
      >
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;

// proptypes
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
