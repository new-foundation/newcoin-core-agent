import { NewcoinListener } from "../src";

const token = "newsafe eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsIjp7Im9yaWdpbiI6ImZpcmViYXNlIn0sImlkZW50aXR5Ijp7ImlkIjoiY2NjODI3NzUtYTBjNC00MmM3LWJlNWUtNGQ4MGNjMTg0MzI2IiwidXNlcm5hbWUiOiJpZ29ybmV3IiwicGhvbmUiOiIrNDIwNzM5NTQ1Mjc4In0sInJlcXVlc3RvciI6Im5ld2NvaW5vcyIsInNjb3BlcyI6W10sImNvbmZpZyI6eyJjcmVhdGVkIjoiMjAyNS0wNC0yM1QxMDowNzoyOC43NTlaIiwiZXhwaXJlcyI6IjIwMjUtMDQtMjNUMTA6Mzc6MjguNzU5WiIsInJlbmV3YWJsZSI6dHJ1ZX0sInRyYWNlIjp7Im9yaWdpbmFsIjoiMjAyNS0wNC0yM1QxMDowNzoyOC43NTlaIiwiZ2VuZXJhdGlvbiI6MH0sInJlcXVlc3QiOnsicmVmZXJlciI6Im5ld2dyYS5waCIsImFwcE93bmVyIjoibmV3Y29pbm9zIiwicmVkaXJlY3RVcmwiOiJodHRwczovL29zLm5ld2NvaW4ub3JnL3N0YXJ0Iiwic2NvcGVzIjpbXX0sImF1dGhvcml0eSI6ImF1dGgubmV3c2FmZS5vcmciLCJ2ZXJzaW9uIjoiMSIsImlhdCI6MTc0NTQwMjg0OH0.N2MfxyAdqH0HRZL0mXYE5EsoSkFxfzn2LAnDV1ejc0i_ZKKBD_2kofRDWqjFK7961G07gKZbKH1WnwvmKRR47jkbFuLZ-m3s1CU5Cus5wNFnvogatMvFCxgrcUr_4QVJXyTrwc-2w56EcHb0-aQb2Cjrp5aNtXy88P5T3Go1paViTnSNZ5MPDNt4TRLWmtvQ_8r_YV26qfy0uk11n4_I5FJZyChwnV3fne5GwvJskyjxKYyEQC6uUCY8tHbeE8KI-6Ns2rG5dVaYToArbavlLDKnLFtWAH8GzDU3PtzC3iC8vWnh-O1w90REHozjpXrWHClOV4Bi7yK_jglhf2MkbxyhxlDcfAF35oUkiH5JWgYN7mQ7xnun2-SYhnWL-E1sr0GcLPrmTk-aFUA0ny9U_uTwcSy8ryEbgzOTRDskuosiAuaZi82Pl1SKszlrj0q6NqZblazU0gAh-uJL0uju002yPOmh6kKtrkPov8rxBwzLlUc0Er4qk5v1EU16Hwm8"; // see README.md

NewcoinListener(token, async (msg: string) => {
    // Some of your options here:

    // 1. fetch from an api...
    // 2. talk to ollama...
    // 3. ask your cat...
    // 4. all of the above

    // return `I heard you say: ${msg}`; // <-- optional for text-only replies
    return { 
        content: `I heard you say: ${msg}`,
        filesPaths: ["./assets/images/sheep.jpg"] // <-- path to a response image; will likely soon allow urls and buffers
    }
})

