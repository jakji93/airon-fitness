/* eslint-disable react/prop-types */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

// function createData(exercise, sets, reps, rest, duration, intensity, calories) {
//   return {
//     exercise, sets, reps, rest, duration, intensity, calories,
//   };
// }

// const rows = [
//   createData('Dumbbell Bench Press', 3, 8, 60, 20, 75, 150),
//   createData('Dumbbell Shoulder Press', 3, 10, 60, 20, 70, 120),
//   createData('Dumbbell Bicep Curls', 3, 12, 60, 15, 65, 90),
//   createData('Dumbbell Tricep Extensions', 3, 12, 60, 15, 65, 90),
//   createData('Dumbbell Lunges', 3, 10, 60, 15, 70, 120),
//   createData('Plank', 3, 60, 60, 30, 60, 80),
// ];

export default function ExercisesTable({ exercises }) {
  const columns = [
    { id: 'exercise', label: 'Exercise', minWidth: 200 },
    { id: 'sets', label: 'Sets', minWidth: 75 },
    { id: 'reps', label: 'Reps', minWidth: 75 },
    { id: 'rest', label: 'Rest', minWidth: 75 },
    { id: 'duration', label: 'Duration', minWidth: 75 },
    { id: 'intensity', label: 'Intensity', minWidth: 75 },
    { id: 'calories', label: 'Calories', minWidth: 75 },
  ];

  const rows = exercises.map((e) => ({
    exercise: e.exercise,
    sets: e.sets,
    reps: e.reps,
    rest: e.rest,
    duration: e.duration,
    intensity: e.intensity,
    calories: e.calories,
  }));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{
      width: '100%',
      paddingLeft: '50px',
      paddingRight: '50px',
      overflow: 'hidden',
    }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
