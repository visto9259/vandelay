<?php

declare(strict_types=1);

namespace App\Form;

use Laminas\Form\Element\Checkbox;
use Laminas\Form\Element\Csrf;
use Laminas\Form\Element\Hidden;
use Laminas\Form\Element\Submit;
use Laminas\Form\Element\Text;
use Laminas\Form\Form;
use Laminas\InputFilter\Input;
use Laminas\InputFilter\InputFilter;

class Enroll extends Form
{
    public function __construct($name = 'enroll', array $options = [])
    {
        parent::__construct($name, $options);
        $this->add([
            'name'       => 'name',
            'type'       => Text::class,
            'options'    => [
                'label'       => 'Name',
                'placeholder' => 'Enter name',
            ],
            'attributes' => [
                'required' => true,
            ],
        ]);
        $this->add([
            'name'       => 'acceptT&C',
            'type'       => Checkbox::class,
            'options'    => [
                'label' => 'I accept the T&Cs',
            ],
            'attributes' => [
                'required' => true,
            ],
        ]);
        $this->add([
            'name'       => 'submit',
            'type'       => Submit::class,
            'value'      => 'enroll',
            'attributes' => [],
            'options'    => [
                'label' => 'Enroll',
            ],
        ]);
        $this->add([
            'name'       => 'installationId',
            'type'       => Hidden::class,
            'attributes' => [
                'required' => true,
            ],
        ]);
/*
        $this->add([
            'name'    => 'csrf',
            'type'    => Csrf::class,
            'options' => [
                'csrf_options' => [
                    'timeout' => 600,
                ],
            ],
        ]);
*/
        $inputFilter = new InputFilter();
        $inputFilter->add([
            'name'     => 'name',
            'required' => true,
            'filters'  => [
                ['name' => 'StringTrim'],
            ],
        ]);
        $inputFilter->add([
            'name'     => 'acceptT&C',
            'required' => true,
        ]);
        $inputFilter->add([
            'name'     => 'installationId',
            'required' => true,
        ]);
/*
        $inputFilter->add([
            'name'     => 'csrf',
            'required' => true,
        ]);;
*/
        $this->setInputFilter($inputFilter);
    }
}
