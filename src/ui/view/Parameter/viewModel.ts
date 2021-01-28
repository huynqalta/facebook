import { useRef } from 'react';

const useParameter = () => {

    const ref = useRef({ setVisible: null })

    return {
        registerForm: ref.current
    }
}

export default useParameter