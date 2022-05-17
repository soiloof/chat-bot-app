import React, {useState, useEffect, useCallback} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput';

const FormDialog() => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            description: ""
        }
        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDescription = this.inputDescription.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    inputName = useCallback((event) => {
        this.setState({name: event.target.value})
    },[])
    inputEmail = useCallback((event) => {
        this.setState({email: event.target.value})
    })
    inputDescription = (event) => {
        this.setState({description: event.target.value})
    }
    submitForm = () => {
        const name = this.state.name
        const email = this.state.email
        const description = this.state.description
        const payload = {
            text: `お問い合わせがありました\nお名前: ${name} \nメールアドレス: ${email} \n 内容: ${description}\n`
        }
        const url = "https://hooks.slack.com/services/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"

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました。追ってご連絡します!')
            this.setState({
                name: "",
                email: "",
                description: ""
            })
        }).catch(() => {
            alert('送信に失敗しました')
        }).finally(() => {
            return this.props.handleClose()
        })
    }

    return (
        <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                お問い合わせフォーム
            </DialogTitle>
            <DialogContent>
                <TextInput
                    label={"お名前（必須）"} multiline={false} rows={1}
                    value={this.state.name} type={"text"} onChange={this.inputName}
                />
                <TextInput
                    label={"メールアドレス（必須）"} multiline={false} rows={1}
                    value={this.state.email} type={"text"} onChange={this.inputEmail}
                />
                <TextInput
                    label={"お問い合わせ内容（必須）"} multiline={true} rows={5}
                    value={this.state.description} type={"text"} onChange={this.inputDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.handleClose}>キャンセル</Button>
                <Button onClick={this.submitForm} autoFocus>
                    送信
                </Button>
            </DialogActions>
        </Dialog>
    )
    }

export default FormDialog;
