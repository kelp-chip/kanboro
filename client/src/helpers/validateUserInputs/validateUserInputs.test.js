import validateNewUser from "./index";
import "@testing-library/jest-dom/extend-expect";

describe("user validation works as expected", () => {
  test("password validation works as expected", () => {
    let username = "username";
    let password = "password";
    let res = validateNewUser(username, password, password);
    expect(res.valid).toBe(false);
    expect(res.message.length).toBe(3);

    password = "Cats";
    res = validateNewUser(username, password, password);
    expect(res.valid).toBe(false);
    expect(res.message.length).toBe(3);

    password = "Cats!11";
    res = validateNewUser(username, password, password);
    expect(res.valid).toBe(false);
    expect(res.message.length).toBe(1);

    password = "Catts!11";
    res = validateNewUser(username, password, password);
    expect(res.valid).toBe(true);
    expect(!!res.message).toBe(false);
  });
  test("username validation works as expected", () => {
    let username = "username";
    let password = "Password2000!";
    let res = validateNewUser(username, password, password);
    expect(res.valid).toBe(true);

    username = "user-name";
    res = validateNewUser(username, password, password);
    expect(res.valid).toBe(false);

    username = "user*na!me";
    res = validateNewUser(username, password, password);
    expect(res.valid).toBe(false);

    username = "Cat";
    res = validateNewUser(username, password, password);
    expect(res.valid).toBe(false);
    expect(res.message.length).toBe(1);
  });

  test("correctly checks if passwords match", () => {
    let username = "username";
    let password = "Password2000!";
    let reenteredPassword = "Password2000!";
    let res = validateNewUser(username, password, reenteredPassword);
    expect(res.valid).toBe(true);
    expect(!!res.message).toBe(false);
  });
});
