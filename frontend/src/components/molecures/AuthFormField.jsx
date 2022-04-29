import React, { memo } from "react";
import TextField from "@mui/material/TextField";

const AuthFormField = memo(
  ({ register, errors, email, setEmail, password, setPassword }) => {
    return (
      <>
        <div>
          <TextField
            id="email"
            label="email"
            variant="outlined"
            sx={{
              width: 280,
              margin: 1,
            }}
            size="small"
            {...register("email")}
            error={"email" in errors}
            helperText={errors.email?.message}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="password"
            variant="outlined"
            type="password"
            sx={{
              width: 280,
              margin: 1,
            }}
            size="small"
            {...register("password")}
            error={"password" in errors}
            helperText={errors.password?.message}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </>
    );
  }
);
export default AuthFormField;
