import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  getTodosAPI,
  addTodosAPI,
  editTodosAPI,
  delTodosAPI,
} from "../../api/todos";
import "./index.scss";

function Todos() {
  // Du lieu hien thi trong bang va cac o nhap.
  const [employees, setEmployees] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Them moi. Co ID: sua nhân vien do.
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Chay khi mo trang đe lay du lieu tu backend .NET.
  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    setLoading(true);
    setError("");
    try {
      const data = await getTodosAPI();
      setEmployees(data);
    } catch {
      setError(
        "Không thể tải danh sách nhân viên. Kiểm tra backend và thử lại.",
      );
    } finally {
      setLoading(false);
    }
  }

  // Xoa noi dung form va tro ve che do them moi.
  function clearForm() {
    setFullName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setEditingId(null);
  }

  // dua thong tin cua dong duoc chon len form.
  function handleEdit(employee) {
    setFullName(employee.fullName || "");
    setEmail(employee.email || "");
    setPhone(employee.phone || "");
    setPosition(employee.position || "");
    setEditingId(employee.id);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const employee = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      position: position.trim(),
    };

    if (
      !employee.fullName ||
      !employee.email ||
      !employee.phone ||
      !employee.position
    ) {
      setError("Vui lòng nhập đầy đủ thông tin nhân viên.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      if (editingId === null) {
        await addTodosAPI(employee);
      } else {
        employee.id = editingId;
        await editTodosAPI(employee);
      }
      clearForm();
      await loadEmployees();
    } catch {
      setError("Không thể lưu nhân viên. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    setError("");
    try {
      await delTodosAPI(deleteId);
      if (editingId === deleteId) {
        clearForm();
      }
      await loadEmployees();
    } catch {
      setError("Không thể xóa nhân viên. Vui lòng thử lại.");
    } finally {
      setDeleteId(null);
      setSaving(false);
    }
  }

  function closeDeleteDialog() {
    if (!saving) {
      setDeleteId(null);
    }
  }

  return (
    <Container component="main" maxWidth="md" className="todos-page">
      <CssBaseline />
      <Paper variant="outlined" className="todos-panel">
        <Typography component="h1" variant="h5" gutterBottom>
          Quản lý nhân viên
        </Typography>

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
            <Button onClick={loadEmployees} disabled={loading || saving}>
              Tải lại danh sách
            </Button>
          </Alert>
        )}

        <Typography component="h2" variant="h6" sx={{ my: 2 }}>
          Danh sách nhân viên
        </Typography>

        <TextField
          label="Tìm kiếm theo tên hoặc chức vụ..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {loading && <Typography role="status">Đang tải danh sách…</Typography>}
        {!loading && employees.length === 0 && (
          <Typography>Danh sách nhân viên trống.</Typography>
        )}
        {!loading && employees.length > 0 && employees.filter((emp) =>
          emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.position?.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <Typography sx={{ color: "text.secondary", my: 2 }}>
            Không tìm thấy nhân viên phù hợp với từ khóa "{searchTerm}".
          </Typography>
        )}

        <TableContainer>
          <Table
            size="small"
            aria-label="Danh sách nhân viên"
            sx={{ minWidth: 650 }}
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Chức vụ</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                .filter((employee) =>
                  employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  employee.position?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((employee) => (
                <TableRow
                  key={employee.id}
                  selected={editingId === employee.id}
                >
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        disabled={saving || loading}
                        onClick={() => handleEdit(employee)}
                      >
                        Sửa
                      </Button>
                      <Button
                        color="error"
                        disabled={saving || loading}
                        onClick={() => setDeleteId(employee.id)}
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 3 }} />
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {editingId === null ? "Thêm nhân viên" : "Chỉnh sửa nhân viên"}
        </Typography>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={2}
          className="todos-form"
        >
          <TextField
            label="Họ và tên"
            size="small"
            disabled={saving}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            size="small"
            disabled={saving}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Số điện thoại"
            type="tel"
            size="small"
            disabled={saving}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <TextField
            label="Chức vụ"
            size="small"
            disabled={saving}
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" type="submit" disabled={saving}>
              {editingId === null ? "Thêm mới" : "Lưu thay đổi"}
            </Button>
            {editingId !== null && (
              <Button variant="outlined" disabled={saving} onClick={clearForm}>
                Hủy chỉnh sửa
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      <Dialog
        open={deleteId !== null}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-title"
      >
        <DialogTitle id="delete-title">Xóa nhân viên</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xóa nhân viên có ID {deleteId}?
        </DialogContent>
        <DialogActions>
          <Button disabled={saving} onClick={closeDeleteDialog}>
            Hủy
          </Button>
          <Button color="error" disabled={saving} onClick={handleDelete}>
            Xác nhận xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Todos;
