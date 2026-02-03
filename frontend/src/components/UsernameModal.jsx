import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

function UsernameModal({open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Modal open={open} onClose={handleClose} className='flex items-center justify-center mx-auto' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                <Box className='w-2/3 outline-0 shadow text-white rounded-md'>
                    <Typography id='modal-modal-title' variant='h6' component='h2' className='bg-indigo-500 text-center'>
                        Change the username
                    </Typography>
                    <Typography id='modal-modal-description' className='mt-2 bg-white'>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default UsernameModal